import { createSchema } from "graphql-yoga";
import ActivityProjectService from "../services/ActivityProjectService";


const activityProjectService = new ActivityProjectService();

const ActivityProjectSchema = createSchema({
    typeDefs: /* GraphQL */ `
        type ActivityProject {
            code: String!
            name: String!
            description: String!
            status: String!
            methodology: String!
            creationDate: String!
            startDate: String!
            finalDate: String!
        }

        type Query {
            getActivityProjectByCode(name: String!): ActivityProject
            getProjectsByMemberEmail(memberEmail: String!): [ActivityProject]
        }

        type Mutation{
          createActivityProject(activityProject: ActivityProject!): ActivityProject
        }
      `,
    resolvers: {
        Query: {
            getActivityProjectByName: async (_, { code }) => {
                return await activityProjectService.getActivityProjectByCode(code);
            },
            getProjectsByMemberEmail: async (_, { memberEmail }) => {
                return await activityProjectService.getProjectsByMemberEmail(memberEmail);
            },
        },
        Mutation: {
            createActivityProject: async (_, { code, name, description, status, methodology, creationDate, startDate, finalDate }) => {
                return await activityProjectService.createActivityProject({ code, name, description, status, methodology, creationDate, startDate, finalDate });
            },
        },
    },
});
export default ActivityProjectSchema;