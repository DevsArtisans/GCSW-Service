import { createSchema } from "graphql-yoga";
import ActivityImplementationService from "../services/ActivityImplementationService";
import PhaseService from "../services/PhaseService";

const phaseService = new PhaseService();
const activityImplementationService = new ActivityImplementationService();

const PhaseSchema = createSchema({
  typeDefs: /* GraphQL */ `
    type Phase {
      name: String!
      description: String!
      startDate: String!
      finalDate: String!
    }

    type ActivityImplementation {
      code: String!
      name: String!
      description: String!
      status: String!
      priority: String!
      creationDate: String!
      startDate: String!
      finalDate: String!
    }

    type Query {
      getActivityImplementationByPhaseAndProject(phaseName: String!, code: String!): [ActivityImplementation]
      getPhasesByProject(code: String!): [Phase]
    }

    type Mutation {
      createPhase(name: String!, description: String!, startDate: String!, finalDate: String!): Phase
    }
  `,
  resolvers: {
    Query: {
      getActivityImplementationByPhaseAndProject: async (_, { phaseName, code }) => {
        return await phaseService.getActivityImplementationByPhaseAndProject(phaseName, code);
      },
      getPhasesByProject: async (_, { code }) => {
        return await phaseService.getPhasesByProject(code);
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
