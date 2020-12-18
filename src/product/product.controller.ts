import { Controller, Get, Post } from "@nestjs/common";


@Controller('products')
export class ProductController{


    @Get()
    getProducts(){
        
    }

}