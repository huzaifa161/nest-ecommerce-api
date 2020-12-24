import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CartService } from "./cart.service";

@Controller('api/cart')
export class CartController{

    constructor(private cartService:CartService){ }
    // @Get(':id')
    // getCart(@Param('id') cartId){
    //     return this.cartService.getCartItems(cartId);
    // }


    @UseGuards(JwtAuthGuard)
    @Post()
    addItemToCart(@Body() data){
        return this.cartService.addItemToCart(data);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('increment/:cartId/:productId')
    incrementCartItem(@Param('cartId') cartId,@Param('productId') productId){
        return this.cartService.incrementCartItem(cartId, productId);
    }


    @UseGuards(JwtAuthGuard)
    @Patch('decrement/:cartId/:productId')
    decrementCartItem(@Param('cartId') cartId, @Param('productId') productId){
        return this.cartService.decrementCartItem(cartId, productId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':customerId')
    getCartItems(@Param('customerId') customerId:string){
        return this.cartService.getCartItems(customerId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    clearCart(@Param('id') cartId){
        return this.cartService.clearCartItem(cartId)
    }
}