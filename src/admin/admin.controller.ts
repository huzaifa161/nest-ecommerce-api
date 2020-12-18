import { Controller, Get, Post, Body, Param, Patch } from "@nestjs/common";
import { AdminService } from './admin.service';
@Controller('api/admin')
export class AdminController{

    constructor(private adminService: AdminService){

    }

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
        return this.adminService.getProducts();
    }


    //GET CATEGORIES
    @Get('categories')
    getCategories(){
        return this.adminService.getCategories();
    }


    //GET ORDERS
    @Get('orders')
    getOrders(){
        return this.adminService.getOrders();
    }

    //GET CUSTOMERS
    @Get('customers')
    getCustomers(){
        return this.adminService.getCustomers();
    }



    //UPDATE ORDER STATUS
    @Patch('/orders/update-order-status/:id')
    updateOrderStatus(@Param('id') id:string){
        return id;
    }



    

}
