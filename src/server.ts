import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
// import { readFile } from "node:fs/promises";
import mongoose from "mongoose";
// import ProductResolvers from "./product/product.resolver.js";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import authenticateToken from "./auth.js";

const PORT = 9000;
interface Context {
  user?: any; // You can replace `any` with a more specific type if you know the structure of the user object
}

export interface AuthenticatedRequest extends Request {
  user?: any; // Replace `any` with your specific user type if known
}

const app = express();
app.use(cors(), express.json());
// app.use(cors(), express.json(), apolloMiddleware);
app.use((req, res, next) => {
  authenticateToken(req, res, next);
});
mongoose
  .connect("mongodb://localhost:27017/newGraphql")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database not connected ", err);
  });

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: AuthenticatedRequest }): Context => {
    return { user: req.user };
  },
});
await apolloServer.start();
// @ts-ignore
app.use("/graphql", expressMiddleware(apolloServer));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
