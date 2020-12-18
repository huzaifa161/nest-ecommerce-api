import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ProductToCart }from './ProductToCart.entity';
import { Customer } from './customer.entity';


@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  quantity: string;

  @OneToMany(() => ProductToCart, productToCart => productToCart.cart)
  public productToCart!: ProductToCart[];


  @ManyToOne(() => Customer, customer => customer.carts)
  customer:Customer;

}