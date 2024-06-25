import { createSchema } from "graphql-yoga";
import PhaseService from "../services/PhaseService";

const phaseService = new PhaseService();

const PhaseSchema = createSchema({
  typeDefs: /* GraphQL */ `
    type Phase {
      name: String!
      description: String!
      startDate: String!
      finalDate: String!
    }

    type Mutation {
       createPhase(name: String,description: String,startDate: String,finalDate: String) : Phase
    }

  `,
  resolvers: {
    Mutation: {
      createPhase: async (_, { name,description, startDate,finalDate }) => {
        return await phaseService.createPhase(name,description,startDate,finalDate); 
      },
    },
  },
});

export default PhaseSchema;
