import { Injectable, NotFoundException, UseInterceptors } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CustomerService } from "src/customer/customer.service";
import { MailService } from "src/mail/mail.service";
import {getConnection} from "typeorm";
import { Customer } from '../entities/customer.entity'; 
@Injectable()
export class AuthService{

    constructor(
        private customerService:CustomerService,
        private jwtService:JwtService,
        private mailService:MailService
        ){ }

    async signUpUser(name:string, email:string, password:string,host){
        if(!name || !email || !password){
            return { message:'Invalid data' }
        }
        const savedUser = await this.customerService.createNewCustomer({ name,email,password:await this.getHashedPassword(password)});  
        const token = crypto.randomBytes(20).toString('hex');

        const link = "http://" + host + "/api/auth/confirm-email/" + token;

        const html = `
        <div style="padding:12px;text-align:justify"> \n
            Hey ${name}
            Please click on the following link ${link} to Verify your account \n 
        </div>
    `
        
        await this.mailService.sendMail(email,html);
        return { message:"Account created Please verify your account"}
    }

    async createForgetPasswordToken(email, host){
        const customer = await this.customerService.findOne(email);
        if(!customer) throw new NotFoundException('customer with that email does not exists');

        const token = crypto.randomBytes(20).toString('hex');

        customer.resetToken = token;
        customer.tokenExpires = (Date.now() + 3600000).toString();
        await this.customerService.save(customer);

        const link = "http://" + host + "/api/auth/reset/" + token;
        const html = `
            <div style="padding:12px;text-align:justify"> \n
                Hey ${customer.name}
                Please click on the following link ${link} to reset your password. \n\n 
                If you did not request this, please ignore this email and your password will remain unchanged.\n
            </div>
        `
        await this.mailService.sendMail(email,html);


        return {message:`Email sent to ${email}..`}

    }

    async confirmEmail (token){
        const customer = await this.findUserByToken(token);

        customer.resetToken = null;
        customer.tokenExpires = null;
        customer.verified = true;

        await this.customerService.save(customer)
        return { message:'Account Verified'}
    }
    
    async findUserByToken(token){
        const userExists = await this.customerService.findToken(token);
        console.log(userExists)
        if(!userExists) throw new NotFoundException('Invalid token');

        const tokenExpires = Number(userExists.tokenExpires);
        if(tokenExpires < Date.now()) throw new NotFoundException('Link Expired');

        return userExists;
    }

    async verifyResetToken (token){
         await this.findUserByToken(token);
         return { message:'ok'};
    }

    async resetPassword(token,password,confirmPassword){
        const user = await this.findUserByToken(token);
        user.password = password;
        user.resetToken = null;
        user.tokenExpires = null;

        await this.customerService.save(user);

        return { message:'password Changed'};
    }

    async getHashedPassword(password:string){
        return await bcrypt.hash(password,10);
    }


    async validateCustomer(email: string, password:string){
        const user = await this.customerService.findOne(email);
        if(user && bcrypt.compare(password, user.password) && user.verified){
            const { password, ...result} = user;
            return result;
        }
        return null;
    }
    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload)
        };
    }

    verifyJwt(token){
        try{
            return this.jwtService.verify(token);
        }catch(e){
            return null
        }
    }

}