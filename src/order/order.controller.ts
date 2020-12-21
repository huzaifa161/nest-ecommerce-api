import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { OrderService } from "./order.service";

@Controller('api/orders')
export class OrderController{
    constructor(private orderService:OrderService){

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

    @UseGuards(JwtAuthGuard)
    @Get('all/:id')
    getOrders(@Param('id') customerId:string){
        return this.orderService.findOrders(customerId);
    } 
}