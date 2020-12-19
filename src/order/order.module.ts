import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "src/cart/cart.module";
import { CartService } from "src/cart/cart.service";
import { Order } from "src/entities/order.entity";
import { ProductToOrder } from "src/entities/productToOrder.entity";
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
@Module({
    imports:[TypeOrmModule.forFeature([Order, ProductToOrder]),CartModule],
    controllers:[OrderController],
    providers:[OrderService]
})
export class OrderModule{
    
}