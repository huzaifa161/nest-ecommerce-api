import { Injectable } from "@nestjs/common";
import { getConnection } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
@Injectable()
export class AdminService{

    async getCustomers(){
        return await getConnection()
            .createQueryBuilder()
            .select("customer")
            .from(Customer, "customer")
            .getMany()
    }

    async getOrders(){
        return await getConnection()
            .createQueryBuilder()
            .select('order')
            .from(Order,'order')
            .getMany();
    }

    async getProducts(){
        return await getConnection()
            .createQueryBuilder()
            .select('product')
            .from(Product,'product')
            .getMany();
    }

    async getCategories(){
        return await getConnection()
            .createQueryBuilder()
            .select('category')
            .from(Category,'category')
            .getMany();
    }
}