import { Controller, Get, Param } from "@nestjs/common";
import { CategoryService } from "./category.service";


@Controller('/api/category')
export class CategoryController{

    
    constructor(private categoryService:CategoryService){}

    @Get()
    getCategories(){
        return this.categoryService.getCategories();
    }

    @Get('sub')
    getCategoriesAndSub(){
        return this.categoryService.getCategoriesAndSub();
    }
    @Get('products')
    getCategoriesAndProducts(){
        return this.categoryService.getCategoriesAndProducts();
    }

    @Get(':catId')
    getProductsByCategory(@Param('catId') catId){
        return this.categoryService.getProductsByCategory(catId)
    }
    
}