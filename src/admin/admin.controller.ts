import { Controller, Get, Post, Body, Param, Patch } from "@nestjs/common";
import { ProductDto } from "src/product/product.dto";
import { AdminService } from './admin.service';
@Controller('api/admin')
export class AdminController{

    constructor(private adminService: AdminService){

    }


    // @Post('/create-admin')
    // async createAdmin(@Body() loginData){
    //     return await this.adminService.createAdmin(loginData.name,loginData.email, loginData.password);
    // }


    @Post('/login')
     login(@Body() loginData){
        return this.adminService.loginAdmin(loginData.email, loginData.password);
    }

    //ADD NEW PRODUCT
    @Post('/add-new-product')
    async createProduct(@Body() productData: ProductDto){
        return await this.adminService.createNewProduct(productData);
    }


    //ADD NEW CATEGORY
    @Post('/add-new-category')
    createCategory(@Body() categoryData){
        return this.adminService.createNewCategory(categoryData);
    }


    //GET PRODUCTS
    @Get('products')
    getProducts(){
        return this.adminService.findAllProducts();
    }


    // GET CATEGORIES
    @Get('categories')
    getCategories(){
        return this.adminService.findAllCategories();
    }


    //GET ORDERS
    @Get('orders')
    getOrders(){
        return this.adminService.findAllOrders();
    }

    //GET CUSTOMERS
    @Get('customers')
    getCustomers(){
        return this.adminService.findAllCustomers();
    }



    //UPDATE ORDER STATUS
    @Patch('/orders/update-order-status/:id')
    updateOrderStatus(@Param('id') id:string){
        return id;
    }



    

}
