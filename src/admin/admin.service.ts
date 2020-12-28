import { Injectable } from "@nestjs/common";
import {  Repository, TreeRepository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { Admin } from '../entities/admin.entity';
import { Category } from '../entities/category.entity';
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcrypt';
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AdminService{

    constructor(
        @InjectRepository(Customer) private customerRespository:Repository<Customer>,
        @InjectRepository(Product) private productRespository:Repository<Product>,
        @InjectRepository(Order) private orderRespository:Repository<Order>,
        @InjectRepository(Category) private categoryRespository:TreeRepository<Category>,
        @InjectRepository(Admin) private adminRepository:Repository<Admin>,
        private authService:AuthService
    ){

    }


    async loginAdmin(email:string, password:string){
        const admin = await this.adminRepository.findOne({ email});
        if(admin && await bcrypt.compare(password,admin.password)){
            return this.authService.login(admin,'Admin');
        }
        return null;
    }

    async createAdmin(name, email, password){

        const adminInstance = this.adminRepository.create({name,email,password:await this.getHashedPassword(password)});
        return this.adminRepository.save(adminInstance)
    }

    async getHashedPassword(password:string){
        return await bcrypt.hash(password,10);
    }

    async updateOrderStatus(orderId, status){
        const order = await this.orderRespository.findOne({id:orderId});
        order.order_status = status;
        await this.orderRespository.save(order);
    }
    async createNewCategory(categoryData,parentId){
        const parent = await this.categoryRespository.findOne({ id: parentId});


        const category =  new Category();
        category.categoryName = categoryData.categoryName;
        category.categoryDesc = categoryData.categoryDesc;
        category.parentId = parentId;
        category.image = categoryData.image;
        category.adminId = categoryData.adminId;
        category.parentId = categoryData.parentId === 'null' ? null: categoryData.parentId;

        category.parent = parent;


        return this.categoryRespository.save(category);
        
    }
    createNewProduct(productData){
        const product = this.productRespository.create(productData);
        return this.productRespository.save(product);
    }

    findAllProducts():Promise<Product[]>{
        return this.productRespository.find();
    }
    findAllCustomers():Promise<Customer[]>{
        return this.customerRespository.find();
    }

    findAllOrders():Promise<Order[]>{
        return this.orderRespository.find();
    }
    findAllCategories():Promise<Category[]>{
        return this.categoryRespository.find();
    }
}