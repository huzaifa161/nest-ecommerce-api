import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { Cart } from './cart.entity';
@Entity()
export class Customer {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  tokenExpires: string;

  @Column()
  resetToken: string;

  @Column({ default: true })
  verified: boolean;

  @OneToMany(() => Order, order => order.customer)
  orders:Order[];

  @OneToMany(() => Cart, cart => cart.customer)
  carts:Cart[];
}