import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Cart } from './cart.entity';
@Entity()
export class ProductToCart {

    @PrimaryGeneratedColumn()
    public productToCartId!: number;

    @Column()
    public productId!: number;

    @Column()
    public cartId!: number;

    @Column()
    total:number;

    @Column()
    quantity:number;

    @ManyToOne(() => Product, product => product.productToCart)
    public product:Product[];

    @ManyToOne(() => Cart, cart => cart.productToCart)
    public cart:Cart[];
}