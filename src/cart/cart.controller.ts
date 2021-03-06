import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards,Request } from "@nestjs/common";
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
    addItemToCart(@Body() data, @Request() req){
        data.customerId = req.user.userId;
        return this.cartService.addItemToCart(data);
    }

    // @UseGuards(JwtAuthGuard)
    // @Patch('increment/:cartId/:productId')
    // incrementCartItem(@Param('cartId') cartId,@Param('productId') productId){
    //     return this.cartService.incrementCartItem(cartId, productId);
    // }

    @UseGuards(JwtAuthGuard)
    @Patch('/update-cart/:prodToCartId')
    async updateCartItemCount(@Param('prodToCartId') id, @Body() body){
        return this.cartService.updateCartItem(id,body.quantity)
    }

    // @UseGuards(JwtAuthGuard)
    // @Patch('decrement/:cartId/:productId')
    // decrementCartItem(@Param('cartId') cartId, @Param('productId') productId){
    //     return this.cartService.decrementCartItem(cartId, productId);
    // }

    @UseGuards(JwtAuthGuard)
    @Get()
    getCartItems(@Request() req){
        console.log(req.user)
        return this.cartService.getCartItems(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    clearCart(@Param('id') cartId){
        return this.cartService.clearCartItem(cartId)
    }
}