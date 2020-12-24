import { Controller, Get, Post } from "@nestjs/common";
import { ProductService } from "./product.service";


@Controller('api/products')
export class ProductController{

    constructor(private productService:ProductService){

    }
    @Get()
    getProducts(){
        return this.productService.getProducts();
    }

}