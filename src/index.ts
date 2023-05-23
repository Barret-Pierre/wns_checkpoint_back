import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import CountriesResolver from "./resolvers/Countries";
import { datasource } from "./utils/data_scource";

async function bootstrap(): Promise<void> {
  // ... Building schema here
  const schema = await buildSchema({
    resolvers: [CountriesResolver],
  });

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    schema,
  });

  await datasource
    .initialize()
    .then(async () => {
      console.log("DB initialized!");
      // Passing an ApolloServer instance to the `startStandaloneServer` function:
      //  1. creates an Express app
      //  2. installs your ApolloServer instance as middleware
      //  3. prepares your app to handle incoming requests
      const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
      });
      console.log(`🚀  Server ready at: ${url}`);
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
}

bootstrap();
