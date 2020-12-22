import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { Product } from "src/entities/product.entity";
import { Category } from "src/entities/category.entity";
import { Order } from "src/entities/order.entity";
import { AuthMiddleware } from './auth.middleware';
import { Admin } from "src/entities/admin.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([Customer,Product, Category, Order,Admin])
        ,AuthModule,
    ],
    controllers:[AdminController],
    providers:[AdminService]
})
export class AdminModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(AuthMiddleware)
          .exclude({ path:'api/admin/login', method: RequestMethod.POST})
          .forRoutes('api/admin/*');
      }
}