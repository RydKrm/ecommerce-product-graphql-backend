import { IResolvers } from "@graphql-tools/utils";
import Product from "./product.model.js";
import authChecker from "../../auth/authChecker.js";
import auth from "../../auth/authHoC.js";

const ProductResolvers: IResolvers = {
  Query: {
    async singleProduct(_, { id }: { id: string }) {
      try {
        return await Product.findById(id).exec();
      } catch (error) {
        throw new Error("Error fetching product");
      }
    },

    async allProduct() {
      try {
        return await Product.find().exec();
      } catch (error) {
        throw new Error("Error fetching products");
      }
    },
  },

  Mutation: {
    // async createProduct(
    //   _,
    //   {
    //     input,
    //   }: {
    //     input: {
    //       name: string;
    //       price: number;
    //       category: string;
    //       description: string;
    //     };
    //   },
    //   context: any
    // ) {
    //   authChecker("manager", context);
    //   try {
    //     const product = new Product(input);
    //     return await product.save();
    //   } catch (error) {
    //     throw new Error("Error creating product");
    //   }
    // },
    createProduct: auth(
      "manager",
      async (_: any, { input }: any, context: any) => {
        try {
          const product = new Product(input);
          return await product.save();
        } catch (error) {
          throw new Error("Error creating product");
        }
      }
    ),

    async updateProduct(
      _,
      {
        input,
      }: {
        input: {
          id: string;
          name?: string;
          price?: number;
          category?: string;
          description?: string;
        };
      },
      context: any
    ) {
      const userRole = context.role;
      authChecker("manager", context);
      try {
        const product = await Product.findByIdAndUpdate(
          input.id,
          { $set: input },
          { new: true }
        ).exec();
        if (!product) throw new Error("Product not found");
        return product;
      } catch (error) {
        throw new Error("Error updating product");
      }
    },

    async deleteProduct(_, { id }: { id: string }) {
      try {
        const result = await Product.findByIdAndDelete(id).exec();
        if (!result) throw new Error("Product not found");
        return true;
      } catch (error) {
        throw new Error("Error deleting product");
      }
    },
  },
};

export default ProductResolvers;
