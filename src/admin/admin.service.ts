import { Injectable } from "@nestjs/common";
import { getConnection, Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { InjectRepository } from "@nestjs/typeorm";
@Injectable()
export class AdminService{

    constructor(
        @InjectRepository(Customer) private customerRespository:Repository<Customer>,
        @InjectRepository(Product) private productRespository:Repository<Product>,
        @InjectRepository(Order) private orderRespository:Repository<Order>,
        @InjectRepository(Category) private categoryRespository:Repository<Category>,
    ){

    }

    // async getCustomers(){
    //     return await getConnection()
    //         .createQueryBuilder()
    //         .select("customer")
    //         .from(Customer, "customer")
    //         .getMany()
    // }

    // async getOrders(){
    //     return await getConnection()
    //         .createQueryBuilder()
    //         .select('order')
    //         .from(Order,'order')
    //         .getMany();
    // }

    // async getProducts(){
    //     return await getConnection()
    //         .createQueryBuilder()
    //         .select('product')
    //         .from(Product,'product')
    //         .getMany();
    // }

    // async getCategories(){
    //     return await getConnection()
    //         .createQueryBuilder()
    //         .select('category')
    //         .from(Category,'category')
    //         .getMany();
    // }

    createNewCategory(categoryData){
        const category =  this.categoryRespository.create(categoryData);
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