import { createSchema } from "graphql-yoga";
import ActivityProjectService from "../services/ActivityProjectService";
import ParticipatesInService from "../services/ParticipatesInService";
import RoleService from "../services/RoleService";

const participatesInService = new ParticipatesInService();
const activityProjectService = new ActivityProjectService();
const roleService = new RoleService();
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
            teamName: String!
        }

        type Query {
            getActivityProjectByCode(code: String!): ActivityProject
            getProjectsByMemberEmail(memberEmail: String!): [ActivityProject]
            getProjectsByTeamName(teamName: String!): [ActivityProject]
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
            getProjectsByTeamName: async (_, { teamName }) => {
                return await activityProjectService.getProjectsByTeamName(teamName);
            },
        },
        Mutation: {
            createActivityProject: async (_, {memberEmail, code, name, description, status, methodology, creationDate, startDate, finalDate }) => {
                
                const response = await activityProjectService.createActivityProject({ code, name, description, status, methodology, creationDate, startDate, finalDate })
                await roleService.createRole("Owner");
                await participatesInService.addMemberToProject(memberEmail, code);;
                return response;
            },
        },
    },
});
export default ActivityProjectSchema;