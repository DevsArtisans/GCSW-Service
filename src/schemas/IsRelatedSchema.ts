import { createSchema } from "graphql-yoga";
import IsRelatedService from "../services/IsRelatedService";

const isRelatedService = new IsRelatedService();

const IsRelatedSchema = createSchema({
  typeDefs: /* GraphQL */ `
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

    type ActivityImplementationWithRelations {
      activityImplementation: ActivityImplementation!
      relatedActivities: [ActivityImplementation]!
    }

    type Query {
      getRelatedActivities(code: String!): [ActivityImplementation]
    }

    type Mutation {
      createRelation(sourceCode: String!, targetCode: String!): Boolean
    }
  `,
  resolvers: {
    Query: {
      getRelatedActivities: async (_, { code }) => {
        return await isRelatedService.getRelatedActivities(code);
      }
    },
    Mutation: {
      createRelation: async (_, { sourceCode, targetCode }) => {
        return await isRelatedService.createRelation(sourceCode, targetCode);
      }
    },
  },
});

export default IsRelatedSchema;
