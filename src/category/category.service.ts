import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { Product } from "src/entities/product.entity";
import { Connection, getManager, In, Repository, TreeRepository } from "typeorm";

@Injectable()
export class CategoryService{


    constructor(
        @InjectRepository(Category) private categoryRepository:TreeRepository<Category>,
        @InjectRepository(Product) private productRepository:Repository<Product>,
        private connection:Connection
        ){
    }

    filterCategories(categories){
        const arr = [];

        for(let cat of categories){
            arr.push(cat.id)
            if(cat.children.length){
                arr.push(...this.filterCategories(cat.children))
            }
        }
        return arr;
    }
    
    async getProductsByCategory(catId){
        const parent = await this.categoryRepository.findOne(catId);
        const trees = await this.categoryRepository.findDescendantsTree(parent);
        const catIds = this.filterCategories(trees.children);
        catIds.push(trees.id)


        return await this.productRepository.find({
            category:In(catIds)
        });
        
        // const manager = getManager()
        // const trees = await manager.getTreeRepository(Category).findTrees()
        // return trees;
        // return await this.categoryRepository.findTrees()
        // return this.categoryRepository.createQueryBuilder('category')
        // .leftJoinAndSelect('category.children','children')
        // .where('category.id = :id',{id:catId})
        // .getMany()


        
        // return this.categoryRepository.find({
        //     join:{
        //         alias:'cat',
        //         innerJoinAndSelect:{
        //             subCat:'cat.children'
        //         }
        //     },where:{
        //         id:catId
        //     }
        // })

        // return this.productRepository.find({
        //     join:{
        //         alias:'cat',
        //         innerJoinAndSelect:{
        //             subCat:"cat.category_parent_id"
        //         }
        //     },
        //     where:{
        //         category:catId
        //     }
        // })
    }


    async getCategoriesAndSub(){
        return await this.categoryRepository.find({
            join:{
                alias:'cat',
                leftJoinAndSelect:{
                    subCat:'cat.children'
                }
            },where:{
                parentId:null
            }
        });
    }


    async getCategories(){


        // return await this.categoryRepository.createQueryBuilder('cat')
            // .leftJoinAndSelect('cat.products','products')
            // // .loadRelationCountAndMap('cat.products','cat.products')
            // // .select(['cat.id','products'])
            // .printSql()
            // .getMany()
        // return await this.connection.query(`SELECT DISTINCT c.id,c.categoryName,p.productName,(p.productName) as productCount FROM category c 
        // INNER JOIN product p ON p.categoryId = c.id
        // GROUP BY c.id,c.categoryName,p.productName`)
        return this.categoryRepository.createQueryBuilder('category')
        .innerJoinAndSelect('category.products','products')
        .select(['category.id','category.categoryName','products.productName','COUNT(products.productName) as prod'])
        .distinct()
        .groupBy('category.categoryName')
        .addGroupBy('category.id')
        .addGroupBy('products.id')
        .addGroupBy('products.productName')
        .orderBy('category.id')
        .getMany();

        return await this.categoryRepository.find();
    }

    async getCategoriesAndProducts(){
        const categories:Category[] = await this.categoryRepository.createQueryBuilder('cat')
        .where({ parentId:null})
        .limit(10)
        .getMany();


        for(let cat of categories){
            const products  = await this.getProductsByCategory(cat.id);
            cat.products = products;
        }
        return categories.filter(cat => cat.products.length >= 5);
    }
    
}