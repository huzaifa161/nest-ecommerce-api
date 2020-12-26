import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartService } from "src/cart/cart.service";
import { ProductToOrder } from "src/entities/productToOrder.entity";
import { Repository } from "typeorm";
import { Order } from '../entities/order.entity';
@Injectable()
export class OrderService{
    constructor(
        @InjectRepository(Order) private orderRepository:Repository<Order>,
        @InjectRepository(ProductToOrder) private productToOrder:Repository<ProductToOrder>,
        private cartService:CartService,
    ){
    }
    findOrder(orderId):Promise<Order>{
        console.log(orderId)
        return this.orderRepository.createQueryBuilder('order')
        .leftJoinAndSelect('order.productToOrder','orderDetails')
        .leftJoinAndSelect('orderDetails.product','product')
        .where('order.id=:id',{id:orderId})
        .getOne()
    }

    findOrders(customerId):Promise<Order[]>{
        console.log(customerId)
        return this.orderRepository.find({customer:customerId});
    }

    async createOrder(customerId){
        console.log('create order')
        const cartItems = await this.cartService.getCartItems(customerId);

        if(!cartItems) return;

        const order = this.orderRepository.create({
            order_date:Date.now().toString(),
            order_status:'pending',
            customer:customerId,
            total_amount: cartItems.total,
            product_count: cartItems.quantity
        });

        const savedOrder = await this.orderRepository.save(order)
        let orders = [];
        for(let cartItem of cartItems.productToCart){
            let order =this.productToOrder.create({ 
                orderId:savedOrder.id,
                total: cartItem.total,
                quantity:cartItem.quantity,
                productId:cartItem.productId,
                discount:0
            });
            orders.push(order);
        }

        await this.productToOrder.insert(orders)
        return this.cartService.clearCart(cartItems.id);
    }


    

}