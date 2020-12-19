import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller('api/orders')
export class OrderController{
    constructor(private orderService:OrderService){

    }

    @Post('create-order')
    createOrder(@Body() body){
        return this.orderService.createOrder(body.customerId);
    }
    
    @Get(':id')
    getOrderById(@Param('id') orderId:string){
        return this.orderService.findOrder(orderId);
    } 

    @Get('all/:id')
    getOrders(@Param('id') customerId:string){
        return this.orderService.findOrders(customerId);
    } 
}