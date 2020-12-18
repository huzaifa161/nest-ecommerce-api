import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";

@Controller('api/cart')
export class CartController{
    @Get()
    getCart(){
        return 'cart'
    }

    @Post()
    addItemToCart(@Body() productId, @Body() customerId){
        return null;
    }

    @Patch('increment/:cartId/:productId')
    incrementCartItem(){
        return null;
    }

    @Patch('decrement/:cartId/:productId')
    decrementCartItem(@Param('cartId') cartId, @Param() productId){
        return null;
    }

    @Get(':customerId')
    getCartItems(@Param('customerId') customerId:string){

    }
}