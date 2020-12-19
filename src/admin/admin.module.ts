import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Product } from "src/entities/product.entity";
import { Category } from "src/entities/category.entity";
import { Order } from "src/entities/order.entity";

@Module({
    imports:[TypeOrmModule.forFeature([Customer,Product, Category, Order])],
    controllers:[AdminController],
    providers:[AdminService]
})
export class AdminModule{
    
}