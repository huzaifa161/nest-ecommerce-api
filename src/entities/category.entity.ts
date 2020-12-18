import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';
@Entity()
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @Column()
  category_desc: string;

  @Column()
  image: string;

  @Column()
  category_parent_id: number;
  
  @OneToMany(() => Product, product => product.category)
  products:Product[];



}