import { Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne } from 'typeorm';
import { Admin } from './admin.entity';
import { Product } from './product.entity';
@Entity()
export class Category {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  categoryName: string;

  @Column()
  categoryDesc: string;

  @Column()
  image: string;


  @Column()
  adminId:number;
  
  @Column({ nullable: true })
  parentId: number;
  @OneToMany(() => Product, product => product.category)
  products:Product[];

  @ManyToOne(() => Category, category => category.children)
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

  @ManyToOne(() => Admin, admin => admin.products)
  admin:Admin;

}