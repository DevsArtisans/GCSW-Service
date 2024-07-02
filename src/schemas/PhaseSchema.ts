import { createSchema } from "graphql-yoga";
import PhaseService from "../services/PhaseService";

const phaseService = new PhaseService();

const PhaseSchema = createSchema({
  typeDefs: /* GraphQL */ `
    type ActivityImplementation {
      code: String!
      name: String!
      description: String!
    }

    type Phase {
      name: String!
      description: String!
      startDate: String!
      finalDate: String!
      activityImplementations: [ActivityImplementation!]
    }

    type PhasesWithActivityImplementations {
      phase: [Phase!]
    }

    type Query {
      getPhases: [Phase!]
      getActivityImplementationByPhase(phaseName: String!): [ActivityImplementation!]
      getActivityImplementationInAllPhases: PhasesWithActivityImplementations
    }

    type Mutation {
      createPhase(name: String!, description: String!, startDate: String!, finalDate: String!): Phase
    }
  `,
  resolvers: {
    Query: {
      getPhases: async () => {
        return await phaseService.getPhases();
      },
      getActivityImplementationByPhase: async (_, { phaseName }) => {
        return await phaseService.getActivityImplementationByPhase(phaseName);
      },
      getActivityImplementationInAllPhases: async () => {
        return await phaseService.getActivityImplementationInAllPhases();
      },
    },
    Mutation: {
      createPhase: async (_, { name, description, startDate, finalDate }) => {
        return await phaseService.createPhase(name, description, startDate, finalDate);
      },
    },
  },
});

export default PhaseSchema;
