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
        console.log('add item')
        let cartExists = await this.cartRepository.findOne({ customer: data.customerId});
        if(!cartExists){
            const cart = this.cartRepository.create({customer:data.customerId});
            cartExists = await this.cartRepository.save(cart);
        }


        let productInCartExists = await this.productToCartRepository.findOne({ cartId: cartExists.id, productId:data.productId});
        if(!!productInCartExists) return;


        const product = await this.productRepository.findOne(data.productId);

        const productInCart = this.productToCartRepository
        .create({productId:data.productId, 
            cartId:cartExists.id, 
            total: product.price,
            quantity:1,
            price:product.price});

        cartExists.quantity = cartExists.quantity + 1;
        cartExists.total = cartExists.total + productInCart.total;
        await this.cartRepository.save(cartExists)

        return this.productToCartRepository.save(productInCart);
    }


    getCartItems(customerId){
        return this.cartRepository.createQueryBuilder('cart')
        .leftJoinAndSelect('cart.productToCart','productToCart')
        .leftJoinAndSelect('productToCart.product','product')
        .where({customer:customerId})
        .getOne()
    }

    // getCartItems(customerId){
    //     return this.cartRepository.findOne({
    //         join:{
    //             alias:'cart',
    //             innerJoinAndSelect:{
    //                 cartItems:"cart.productToCart"
    //             }
    //         },where:{
    //             customer:customerId
    //         }
    //     })
    // }

    async incrementCartItem(cartId, productId){
        const data = await this.productToCartRepository.findOne({cartId, productId});
        data.quantity = data.quantity +1;
        data.total = data.price * data.quantity;

        const cart = await this.cartRepository.findOne({id:cartId});
        cart.quantity = cart.quantity + 1;
        cart.total = cart.total + data.total;
        await this.cartRepository.save(cart);
        return this.productToCartRepository.save(data);
    }



    async decrementCartItem(cartId, productId){
        const data = await this.productToCartRepository.findOne({cartId, productId});
        if(data.quantity > 1){
            data.quantity = data.quantity - 1;
            data.total = data.price * data.quantity; 

            const cart = await this.cartRepository.findOne({id:cartId});
            cart.total = cart.total - data.quantity;
            cart.quantity = data.quantity === 1 ? cart.quantity - 1 : cart.quantity;

            await this.cartRepository.save(cart)

        }
        return this.productToCartRepository.save(data);
    }


    async clearCartItem(id){
        const cartItem = await this.productToCartRepository.findOne({ productToCartId:id});
        this.productToCartRepository.remove(cartItem)

        const cart = await this.cartRepository.findOne({id:cartItem.cartId});
        cart.quantity = cart.quantity -1;
        cart.total = cart.total - cartItem.total;
        await this.cartRepository.save(cart);        
        return { success: 'ok'}
    //     const cartExists = await this.cartRepository.findOne({ id:cartId});

    //     if(!cartExists){
    //         return null
    //     }
    //     const cartToProduct = await this.productToCartRepository.find({cartId:cartExists.id});
        
    //     await this.productToCartRepository.remove(cartToProduct);
       
    //     await this.cartRepository.remove(cartExists);
    //     return {success:'ok'};
    // }   
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