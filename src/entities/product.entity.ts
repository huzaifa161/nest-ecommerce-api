import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Admin } from './admin.entity';
import { Category } from './category.entity';
import { ProductToCart} from './ProductToCart.entity';
import { ProductToOrder } from './productToOrder.entity';
@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  productDesc: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  image_1:string;

  @Column()
  image_2:string;

  @Column()
  image_3:string;
  
  @ManyToOne(() => Admin, admin => admin.products)
  admin:Admin;

  @ManyToOne(() => Category, category => category.products)
  category:Category;


  @OneToMany(() => ProductToCart, productToCart => productToCart.product)
  public productToCart!: ProductToCart[];

  @OneToMany(() => ProductToOrder, productToOrder => productToOrder.product)
  public productToOrder!: ProductToOrder[];
}