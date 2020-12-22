import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { Product } from "src/entities/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService{


    constructor(
        @InjectRepository(Category) private categoryRepository:Repository<Category>,
        @InjectRepository(Product) private productRepository:Repository<Product>
        ){
    }
    getProductsByCategory(catId){
        return this.productRepository.find({
            join:{
                alias:'cat',
                innerJoinAndSelect:{
                    subCat:"cat.category_parent_id"
                }
            },
            where:{
                category:catId
            }
        })
    }


    async getCategories(){
        return await this.categoryRepository.find({
            join:{
                alias:'cat',
                leftJoinAndSelect:{
                    subCat:'cat.children'
                }
            },
        });
    }

    async getCategoriesAndProducts(){
        const categories = await this.categoryRepository.createQueryBuilder('cat')
        .leftJoinAndSelect('cat.products','products')
        .getMany()
        return categories.filter(cat => cat.products.length >=5)

    }
    
}