import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/entities/cart.entity";
import { Product } from "src/entities/product.entity";
import { ProductToCart } from "src/entities/ProductToCart.entity";
import { Repository } from "typeorm";

@Injectable()
export class CartService{
    constructor(
        @InjectRepository(Cart) private cartRepository: Repository<Cart>,
        @InjectRepository(ProductToCart) private productToCartRepository: Repository<ProductToCart>,
        @InjectRepository(Product) private productRepository: Repository<Product>
        ){

    }    
    async addItemToCart(data){

        let cartExists = await this.cartRepository.findOne({ customer: data.customerId});

        if(!cartExists){
            const cart = this.cartRepository.create({customer:data.customerId});
            cartExists = await this.cartRepository.save(cart);
        }


        const product = await this.productRepository.findOne(data.productId);

        const productInCart = this.productToCartRepository
        .create({productId:data.productId, 
            cartId:cartExists.id, 
            total: data.quantity * product.price,
            quantity:data.quantity,
            price:product.price});


        return this.productToCartRepository.save(productInCart);
    }


    getCartItems(customerId){
        return this.cartRepository.findOne({
            join:{
                alias:'cart',
                innerJoinAndSelect:{
                    cartItems:"cart.productToCart"
                }
            },where:{
                customer:customerId
            }
        })
    }

    async incrementCartItem(cartId, productId){
        const data = await this.productToCartRepository.findOne({cartId, productId});
        data.quantity = data.quantity +1;
        data.total = data.price * data.quantity;
        return this.productToCartRepository.save(data);
    }



    async decrementCartItem(cartId, productId){
        const data = await this.productToCartRepository.findOne({cartId, productId});
        if(data.quantity > 1){
            data.quantity = data.quantity - 1;
            data.total = data.price * data.quantity;    
        }
        return this.productToCartRepository.save(data);
    }


    async clearCart(cartId){
        const cartExists = await this.cartRepository.findOne({ id:cartId});

        if(!cartExists){
            return null
        }
        const cartToProduct = await this.productToCartRepository.find({cartId:cartExists.id});
        
        await this.productToCartRepository.remove(cartToProduct);
       
        await this.cartRepository.remove(cartExists);
        return {success:'ok'};
    }   
}