import CategoryResolvers from "./module/category/category.resolver.js";
import ProductResolvers from "./module/product/product.resolver.js";

const resolvers = {
  Query: {
    ...ProductResolvers.Query,
    ...CategoryResolvers.Query,
  },
  Mutation: {
    ...ProductResolvers.Mutation,
    ...CategoryResolvers.Mutation,
  },
};

export default resolvers;
