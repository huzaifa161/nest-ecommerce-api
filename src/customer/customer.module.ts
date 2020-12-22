import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "src/entities/customer.entity";
import { CustomerService } from "./customer.service";

@Module({
    imports:[TypeOrmModule.forFeature([Customer])],
    providers:[CustomerService],
    exports:[CustomerService]
})
export class CustomerModule{

}