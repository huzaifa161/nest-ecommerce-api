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
        console.log(result)
        return result

    }


    async createNewCustomer(customer){
        const customerInstance = this.customerRepository.create(customer);
        return await this.customerRepository.save(customerInstance);
    }
    async save(user){
        await this.customerRepository.save(user);
    }
}