import { IResolvers } from '@graphql-tools/utils';
import Category from './category.model.js';

interface ICreateCategory {
    name:string;
    description:string;
}

interface IUpdateCategory{
    name?:string;
    description?:string;
}

const CategoryResolvers:IResolvers = {
    Query:{
        async singleCatrgory(_, {id}:{id:string}){
            try {
                await Category.findById(id);
            } catch (error) {
                throw new Error("Error fetching category")
            }
        },
        async allCategory(){
            try {
                return await Category.find();
            } catch (error) {
                throw new Error("Error fatching category");
            }
        }
    },
    
    // Mutation start here
    Mutation:{
        async createCategory(_, {input}:{input:ICreateCategory}){
            try {
                const category = new Category(input);
                await category.save();
            } catch (error) {
                throw new Error("Error Creating Category");
            }
        },
        async updateCategory(_,{id}:{id:string},{input}:{input:IUpdateCategory}){
            try {
                return await Category.findByIdAndUpdate(id,input);
            } catch (error) {
                throw new Error("Error on updating category")
            }
        },

        async deleteCategory(_, { id }: { id: string }) {
            try {
              const result = await Category.findByIdAndDelete(id).exec();
              if (!result) throw new Error("Category not found");
              return true;
            } catch (error) {
              throw new Error("Error deleting category");
            }
          },
    }
}

export default CategoryResolvers;