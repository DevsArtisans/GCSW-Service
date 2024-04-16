import { createYoga } from "graphql-yoga";
import schema from "./schemas/SchemasServer";

const ServerSchema = createYoga({
  schema: schema,
})

const server = Bun.serve({
  fetch: ServerSchema,
})

console.info(
  `Server is running on ${new URL(
    ServerSchema.graphqlEndpoint,
    `http://${server.hostname}:${server.port}`
  )}`
)
