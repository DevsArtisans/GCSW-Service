import { createSchema } from "graphql-yoga";
import HasPhaseService from "../services/HasPhaseService";

const hasPhaseService = new HasPhaseService();

const HasPhaseSchema = createSchema({
  typeDefs: /* GraphQL */ `
    type Mutation {
      addPhaseToProject(name: String!, code: String!): Boolean
    }
  `,
  resolvers: {
    Mutation: {
        addPhaseToProject: async (_, { name, code }) => {
            return await hasPhaseService.addPhaseToProject(name, code);
        },
    },
  },
});

export default HasPhaseSchema;
