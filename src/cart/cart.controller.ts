import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CartService } from "./cart.service";

@Controller('api/cart')
export class CartController{

    constructor(private cartService:CartService){ }
    // @Get(':id')
    // getCart(@Param('id') cartId){
    //     return this.cartService.getCartItems(cartId);
    // }

    @Post()
    addItemToCart(@Body() data){
        return this.cartService.addItemToCart(data);
    }

    @Patch('increment/:cartId/:productId')
    incrementCartItem(@Param('cartId') cartId,@Param('productId') productId){
        return this.cartService.incrementCartItem(cartId, productId);
    }

    @Patch('decrement/:cartId/:productId')
    decrementCartItem(@Param('cartId') cartId, @Param('productId') productId){
        return this.cartService.decrementCartItem(cartId, productId);
    }

    @Get(':customerId')
    getCartItems(@Param('customerId') customerId:string){
        return this.cartService.getCartItems(customerId);
    }

    @Delete(':id')
    clearCart(@Param('id') cartId){
        return this.cartService.clearCart(cartId);
    }
}