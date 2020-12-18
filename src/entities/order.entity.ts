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

  @Column()
  total_amount: number;

  @Column()
  product_count: number;

  @Column()
  category_parent_id: number;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer:Customer;

  @OneToMany(() => ProductToOrder, productToOrder => productToOrder.order)
  public productToOrder!: ProductToOrder[];
}