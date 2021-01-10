import { join } from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { MailModule } from './mail/mail.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: process.env.DB_USERNAME,
      password: 'huzaifa',
      database: 'test',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      logging:true
    }),
    AdminModule,
    CategoryModule,
    OrderModule,
    AuthModule,
    CartModule,
    AuthModule,
    MailModule,
    ProductModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
