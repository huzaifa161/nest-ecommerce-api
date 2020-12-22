import { Entity, Column, PrimaryGeneratedColumn, OneToMany,ManyToOne } from 'typeorm';
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

  // @Column({ nullable: true})
  // category_parent_id: number;
  
  @OneToMany(() => Product, product => product.category)
  products:Product[];

  @ManyToOne(() => Category, category => category.children)
  parent: Category;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

}