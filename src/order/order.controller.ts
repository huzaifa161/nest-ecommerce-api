import { Body, Controller, Get, Param, Post, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { OrderService } from "./order.service";

@Controller('api/orders')
export class OrderController{
    constructor(private orderService:OrderService){

    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    getOrders(@Request() req){
        console.log(req.user)
        return this.orderService.findOrders(req.user.userId);
    } 

    @UseGuards(JwtAuthGuard)
    @Post('create-order')
    createOrder(@Body() body){
        return this.orderService.createOrder(body.customerId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOrderById(@Param('id') orderId:string){
        return this.orderService.findOrder(orderId);
    } 


}