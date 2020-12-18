import { Controller, Get, Post, Body, Param, Patch } from "@nestjs/common";

@Controller('api/admin')
export class AdminController{


    //ADD NEW PRODUCT
    @Post('/add-new-product')
    createProduct(@Body() productData, @Body() catId:string){

    }


    //ADD NEW CATEGORY
    @Post('/add-new-category')
    createCategory(@Body() categoryData){

    }


    //GET PRODUCTS
    @Get('products')
    getProducts(){
        return ['product 1','product 2']
    }


    //GET CATEGORIES
    @Get('categories')
    getCategories(){
        return ['category 1','category 2']
    }


    //GET ORDERS
    @Get('orders')
    getOrders(){
        return ['order 1','order 2']
    }



    //UPDATE ORDER STATUS
    @Patch('/orders/update-order-status/:id')
    updateOrderStatus(@Param('id') id:string){
        return id;
    }



    

}
