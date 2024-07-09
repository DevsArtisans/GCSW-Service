import { createSchema } from "graphql-yoga";
import ActivityImplementationService from "../services/ActivityImplementationService";

const activityImplementationService = new ActivityImplementationService();

const ActivityImplementationSchema = createSchema({
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
    type Member {
      name: String!
      email: String!
    }

    type ActivityImplementationWithUsers {
      activityImplementation: ActivityImplementation!
      assignedUsers: [Member]!
    }

    type Query {
      getActivityImplementationByCode(code: String!): ActivityImplementation
      getImplementationsByProjectCode(projectCode: String!): [ActivityImplementation]
      getActivityImplementationsByTeam(teamName: String!): [ActivityImplementationWithUsers]
    }

    type Mutation {
      createActivityImplementation(
        code: String!,
        name: String!,
        description: String!,
        status: String!,
        priority: String!,
        creationDate: String!,
        startDate: String!,
        finalDate: String!
      ): ActivityImplementation
      updateActivityImplementationStatus(code: String!, status: String!): ActivityImplementation
    }
  `,
  resolvers: {
    Query: {
      getActivityImplementationByCode: async (_, { code }) => {
        return await activityImplementationService.getActivityImplementationByCode(code);
      },
      getImplementationsByProjectCode: async (_, { projectCode }) => {
        return await activityImplementationService.getImplementationsByProjectCode(projectCode);
      },
      getActivityImplementationsByTeam: async (_, { teamName }) => {
        return await activityImplementationService.getActivityImplementationsByTeam(teamName);
      }
    },
    Mutation: {
      createActivityImplementation: async (_, { code, name, description, status, priority, creationDate, startDate, finalDate }) => {
        return await activityImplementationService.createActivityImplementation({ code, name, description, status, priority, creationDate, startDate, finalDate });
      },
      updateActivityImplementationStatus: async (_, { code, status }) => {
        return await activityImplementationService.updateActivityImplementationStatus(code, status);
      },
    },
  },
});

export default ActivityImplementationSchema;
