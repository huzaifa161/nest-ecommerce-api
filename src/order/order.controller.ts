import { Controller, Get, Param } from "@nestjs/common";

@Controller('api/orders')
export class OrderController{
    @Get(':id')
    getOrderById(@Param('id') orderId:string){
        return {
            order:{
                orderId,
                orderDate:'21Dec, 2020',
                total:23500
            }
        }
    } 
}