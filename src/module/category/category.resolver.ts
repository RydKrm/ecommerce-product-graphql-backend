import { IResolvers } from "@graphql-tools/utils";
import auth from "../../auth/authHoC.js";
import {
  negativeResponse,
  positiveResponse,
} from "../../lib/response/response.js";
import CategoryModel from "./category.model.js";

interface ICreateCategory {
  name: string;
  description: string;
}

interface IUpdateCategory {
  id: string;
  name?: string;
  description?: string;
}

const CategoryResolvers: IResolvers = {
  Query: {
    async singleCategory(_, { id }: { id: string }) {
      try {
        const category = await CategoryModel.findById(id);
        if (!category) {
          return negativeResponse("Category not found by _id");
        }
        return positiveResponse("Category found", { data: category });
      } catch (error) {
        throw new Error("Error fetching category");
      }
    },
    async allCategory() {
      try {
        const list = await CategoryModel.find();
        return positiveResponse("Category list", { data: list });
      } catch (error) {
        throw new Error("Error fetching category");
      }
    },
  },

  // Mutation start here
  Mutation: {
    createCategory: auth(
      "admin",
      async (_: any, { input }: any, context: any) => {
        try {
          const name = input?.name;

          const isExists = await CategoryModel.countDocuments({ name });
          if (isExists > 0) {
            return negativeResponse("Category exists with this same name");
          }

          const category = new CategoryModel(input);
          await category.save();
          //   console.log("name", category);
          return positiveResponse("Category Created", { data: category });
        } catch (error) {
          throw new Error("Error Creating Category");
        }
      }
    ),
    updateCategory: auth(
      "admin",
      async (_: any, { input }: { input: IUpdateCategory }) => {
        try {
          const { id, ...others } = input;
          const category = await CategoryModel.findByIdAndUpdate(id, others);
          return positiveResponse("Category updated", { data: category });
        } catch (error) {
          throw new Error("Error on updating category");
        }
      }
    ),

    deleteCategory: auth("admin", async (_: any, { id }: { id: string }) => {
      try {
        const result = await CategoryModel.findByIdAndDelete(id).exec();
        if (!result) {
          return negativeResponse("Category not found by _id");
        }
        return positiveResponse("Category Deleted");
      } catch (error) {
        throw new Error("Error deleting category");
      }
    }),
  },
};

export default CategoryResolvers;
