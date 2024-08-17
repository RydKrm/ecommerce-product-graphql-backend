import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
// import { readFile } from "node:fs/promises";
import mongoose from "mongoose";
// import ProductResolvers from "./product/product.resolver.js";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolverList.js";

const PORT = 9000;

const app = express();
app.use(cors(), express.json());
// app.use(cors(), express.json(), apolloMiddleware);

mongoose
  .connect("mongodb://localhost:27017/newGraphql")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database not connected ", err);
  });

// const typeDefs = await readFile("./src/product/product.schema.graphql", "utf8");
 
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});
await apolloServer.start();  

app.use("/graphql", expressMiddleware(apolloServer));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
