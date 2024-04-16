import { createSchema } from "graphql-yoga";
import ActivityImplementationService from "../services/ActivityImplementationService";

const activityImplementationService = new ActivityImplementationService();

const ActivityImplementationSchema = createSchema({
  typeDefs: /* GraphQL */ `
        type ActivityImplementation {
            name: String!
            description: String!
            status: String!
            priority: String!
            creationDate: String!
            startDate: String!
            finalDate: String!
        }

        type Query {
            getActivityImplementationByName(name: String!): ActivityImplementation
            getActivityImplementationByStatus(status: String!): ActivityImplementation
            getActivityImplementationByPriority(priority: String!): ActivityImplementation
            getActivityImplementationByCreationDate(creationDate: String!): ActivityImplementation
            getActivityImplementationByStartDate(startDate: String!): ActivityImplementation
            getActivityImplementationByFinalDate(finalDate: String!): ActivityImplementation 
        }
        type Mutation{
            createActivityImplementation(name:String!,description: String!, status: String!, priority: String!, creationDate: String!, startDate: String!, finalDate: String!): ActivityImplementation
            updateActivityImplementation(name:String!,description: String!, status: String!, priority: String!, creationDate: String!, startDate: String!, finalDate: String!): ActivityImplementation
            deleteActivityImplementation(name:String!): ActivityImplementation
        }
      `,
  resolvers: {
    Query: {
      getActivityImplementationByName: async (_, { name }) => {
        return await activityImplementationService.getActivityImplementationByName(name)
      },
      getActivityImplementationByStatus: async (_, { status }) => {
        return await activityImplementationService.getActivityImplementationByStatus(status)
      },
      getActivityImplementationByPriority: async (_, { priority }) => {
        return await activityImplementationService.getActivityImplementationByPriority(priority)
      },
      getActivityImplementationByCreationDate: async (_, { creationDate }) => {
        return await activityImplementationService.getActivityImplementationByCreationDate(creationDate)
      },
      getActivityImplementationByStartDate: async (_, { startDate }) => {
        return await activityImplementationService.getActivityImplementationByStartDate(startDate)
      },
      getActivityImplementationByFinalDate: async (_, { finalDate }) => {
        return await activityImplementationService.getActivityImplementationByFinalDate(finalDate)
      },
    },
    Mutation: {
      createActivityImplementation: async (_, { name, description, status, priority, creationDate, startDate, finalDate }) => {
        return await activityImplementationService.createActivityImplementation({ name, description, status, priority, creationDate, startDate, finalDate })
      },
      updateActivityImplementation: async (_, { name, description, status, priority, creationDate, startDate, finalDate }) => {
        return await activityImplementationService.updateActivityImplementation(name, { name, description, status, priority, creationDate, startDate, finalDate })
      },
      deleteActivityImplementation: async (_, { name }) => {
        return await activityImplementationService.deleteActivityImplementation(name)
      },
    },
  },
}
);

export default ActivityImplementationSchema;