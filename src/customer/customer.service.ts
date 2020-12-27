import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "src/entities/customer.entity";
import { Repository } from "typeorm";

@Injectable()
export class CustomerService{
 
    constructor(@InjectRepository(Customer) private customerRepository: Repository<Customer>){

    }

    async findOne(email){
        return await this.customerRepository.findOne({email});
    }


    async findToken(token){
        const result = await this.customerRepository.findOne({resetToken: token});
        return result

    }

    async findCustomerByToken(email){
        return await this.customerRepository.findOne({ email});
    }

    async createNewCustomer({ name, email, password}){
        const cus = new Customer();
        cus.name = name;
        cus.email = email;
        cus.password = password; 
        const customerRes =  await this.customerRepository.save(cus);
        return customerRes;
    }
    async save(user){
        await this.customerRepository.save(user);
    }
}