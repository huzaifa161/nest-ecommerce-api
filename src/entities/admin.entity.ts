import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Product } from './product.entity';

@Entity()
export class Admin {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Product, product => product.admin)
  products:Product[];
  @OneToMany(() => Category, category => category.admin)
  categories:Category[];

}