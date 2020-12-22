import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { Product } from "src/entities/product.entity";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";

@Module({
    imports:[TypeOrmModule.forFeature([Category,Product])],
    controllers:[CategoryController],
    providers:[CategoryService]
})

export class CategoryModule{
    
}