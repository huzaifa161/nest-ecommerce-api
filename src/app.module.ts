import { join } from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "huzaifa",
    password: "huzaifa",
    database: "test",
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    synchronize: true
  }),
  AdminModule, 
  CategoryModule, 
  OrderModule,
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}