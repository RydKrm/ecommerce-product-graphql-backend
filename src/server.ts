import { ApolloServer, BaseContext } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import type { ExpressContextFunctionArgument } from "@apollo/server/express4"; // Import this type
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import authenticateToken, { reqUser } from "./auth.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import { authMiddleware } from "./../build/auth";

const PORT = 9090;

// Define your context type
interface Context extends BaseContext {
  user?: any;
}

// const app = express();
// app.use(cors(), express.json());
// app.use((req, res, next) => {
//   authenticateToken(req, res, next);
// });

mongoose
  .connect("mongodb://localhost:27017/newGraphql")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database not connected ", err);
  });

// const apolloServer = new ApolloServer<Context>({
//   typeDefs,
//   resolvers,
//   context: ({ req }: ExpressContextFunctionArgument) => {
//     console.log("Context User: ", (req as reqUser).user);
//     return { user: (req as reqUser).user };
//   },
// });

// await apolloServer.start();
// app.use("/graphql", expressMiddleware(apolloServer));

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    console.log(req.headers);
    // return true;
    const authHeader = req.headers?.authorization || ""; // .authorization || "";
    const token = authHeader.split(" ")[1];
    if (token === "123456") {
      return true;
    } else {
      return false;
    }

    // const user = req.user;
    // return user;
  },
});

console.log("server start at : ", url);

// app.listen({ port: PORT }, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
// });
