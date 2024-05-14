import { createSchema } from "graphql-yoga";
import ActivityProjectService from "../services/ActivityProjectService";
import ParticipatesInService from "../services/ParticipatesInService";

const participatesInService = new ParticipatesInService();
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
            getActivityProjectByCode(code: String!): ActivityProject
            getProjectsByMemberEmail(memberEmail: String!): [ActivityProject]
        }

        type Mutation{
          createActivityProject(memberEmail: String!,code: String!,name: String!, description: String!, status: String!,  methodology:  String!, creationDate: String!, startDate: String!, finalDate: String!) : ActivityProject

        }
      `,
    resolvers: {
        Query: {
            getActivityProjectByCode: async (_, { code }) => {
                return await activityProjectService.getActivityProjectByCode(code);
            },
            getProjectsByMemberEmail: async (_, { memberEmail }) => {
                return await activityProjectService.getProjectsByMemberEmail(memberEmail);
            },
        },
        Mutation: {
            createActivityProject: async (_, {memberEmail, code, name, description, status, methodology, creationDate, startDate, finalDate }) => {
                participatesInService.addMemberToProject(memberEmail, code);
                return await activityProjectService.createActivityProject({ code, name, description, status, methodology, creationDate, startDate, finalDate });
            },
        },
    },
});
export default ActivityProjectSchema;