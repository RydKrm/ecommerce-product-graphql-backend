import { ApolloServer, BaseContext } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import type { ExpressContextFunctionArgument } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { graphqlUploadExpress } from 'graphql-upload';
import multer from "multer";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import authenticateToken, { reqUser } from "./auth/authBasic.js";
import { startStandaloneServer } from "@apollo/server/standalone";

const PORT = 9090;

// Define your context type
interface Context extends BaseContext {
  user?: { role: string } | any;
}

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Express app setup
const app = express();
app.use(cors(), express.json());

app.use(graphqlUploadExpress)

app.use(graphqlUploadExpress());
app.use(upload.array('files'));

mongoose
  .connect("mongodb://localhost:27017/newGraphql")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database not connected ", err);
  });

// Apollo Server setup
const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  context: ({ req }: ExpressContextFunctionArgument) => {
    // console.log("Context User: ", (req as reqUser).user);
    return { user: (req as reqUser).user };
  },
});

await apolloServer.start();
app.use("/graphql", expressMiddleware(apolloServer));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
