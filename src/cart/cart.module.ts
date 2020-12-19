import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/entities/cart.entity";
import { Product } from "src/entities/product.entity";
import { ProductToCart } from "src/entities/ProductToCart.entity";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";

@Module({
    imports:[TypeOrmModule.forFeature([Cart,Product, ProductToCart])],
    controllers:[CartController],
    providers:[CartService],
    exports:[CartService]
})
export class CartModule{
    
}