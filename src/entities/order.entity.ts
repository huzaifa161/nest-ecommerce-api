import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';

import { ProductToOrder } from './productToOrder.entity';
@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_date: string;

  @Column()
  order_status: string;

  @Column({ nullable: true})
  total_amount: number;

  @Column({ nullable: true})
  product_count: number;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer:Customer;

  @OneToMany(() => ProductToOrder, productToOrder => productToOrder.order)
  public productToOrder!: ProductToOrder[];
}