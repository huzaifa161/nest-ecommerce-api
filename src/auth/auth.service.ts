import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import {getConnection} from "typeorm";
import { Customer } from '../entities/customer.entity'; 
@Injectable()
export class AuthService{


    async signUpUser(name:string, email:string, password:string){
        const savedUser =  await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Customer)
            .values({
                name,email,password:await this.getHashedPassword(password)
            })
            .execute();
            return {id: savedUser.identifiers[0].id};
    }
    

    async getHashedPassword(password:string){
        return await bcrypt.hash(password,10);
    }
}