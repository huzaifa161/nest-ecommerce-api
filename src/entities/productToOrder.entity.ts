import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';
@Entity()
export class ProductToOrder {

    @PrimaryGeneratedColumn()
    public productToOrderId!: number;

    @Column()
    public productId!: number;

    @Column()
    public orderId!: number;

    @Column()
    total:number;

    @Column()
    quantity:number;

    @Column()
    discount:number;

    @ManyToOne(() => Product, product => product.productToOrder)
    public product:Product[];

    @ManyToOne(() => Order, order => order.productToOrder)
    public order:Order[];
}