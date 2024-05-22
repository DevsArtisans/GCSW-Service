import { createSchema } from "graphql-yoga";
import IncludesService from "../services/IncludesService";

const includesServices = new IncludesService();

const IncludesSchema = createSchema({
  typeDefs: /* GraphQL */ `
    type Mutation {
      addImplementationToProject(codeImplementation: String!, codeProject: String!): Boolean
      removeImplementationFromProject(codeImplementation: String!, codeProject: String!): Boolean
    }
  `,
  resolvers: {
    Mutation: {
      addImplementationToProject: async (_, { codeImplementation, codeProject }) => {
        return await includesServices.addImplementationToProject(codeImplementation, codeProject);
      },
      removeImplementationFromProject: async (_, { codeImplementation, codeProject }) => {
        return await includesServices.removeImplementationFromProject(codeImplementation, codeProject);
      },
    },
  },
});

export default IncludesSchema;
