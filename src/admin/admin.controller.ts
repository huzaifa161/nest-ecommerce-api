import { Controller, Get, Post, Body, Param, Patch, UseInterceptors, UploadedFile, UploadedFiles, Request } from "@nestjs/common";
import { FileFieldsInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { ProductDto } from "src/product/product.dto";
import { AdminService } from './admin.service';
import * as path from 'path';

import { diskStorage } from 'multer';

@Controller('api/admin')
export class AdminController{

    constructor(private adminService: AdminService){

    }


    @Post('/create-admin')
    async createAdmin(@Body() loginData){
        return await this.adminService.createAdmin(loginData.name,loginData.email, loginData.password);
    }


    @Post('/login')
     login(@Body() loginData){
        return this.adminService.loginAdmin(loginData.email, loginData.password);
    }

    //ADD NEW PRODUCT
    @Post('/add-new-product')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image_1', maxCount: 1 },
        { name: 'image_2', maxCount: 1 },
        { name: 'image_3', maxCount: 1 },
    ], {
        storage: diskStorage({
          destination: './uploads'
          , filename: (req, file, cb) => {
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            cb(null, `${randomName}${path.extname(file.originalname)}`)
          }
        })
      }))
    async createProduct(@Body() productData: ProductDto, @UploadedFiles() files,@Request() req){
        productData.admin = req.user.sub;
        if(files.image_1) productData.image_1 = files.image_1[0].filename;
        if(files.image_2) productData.image_2 = files.image_2[0].filename;
        if(files.image_3) productData.image_3 = files.image_3[0].filename;
        return await this.adminService.createNewProduct(productData);
    }


    //ADD NEW CATEGORY
    @Post('/add-new-category')
    @UseInterceptors(FileInterceptor('image',{
        storage:diskStorage({
            destination: './uploads/category'
            , filename: (req, file, cb) => {
              const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
              cb(null, `${randomName}${path.extname(file.originalname)}`)
            }
          })
    }))
    async createCategory(@Body() categoryData,@UploadedFile() file){
        categoryData.image = file.filename;
        return this.adminService.createNewCategory(categoryData);
    }


    //GET PRODUCTS
    @Get('products')
    getProducts(@Request() req){
        console.log(req.user)
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
