import { createSchema } from "graphql-yoga";
import ParticipatesInService from "../services/ParticipatesInService";
import HasRoleService from "../services/HasRoleService";

const participatesInService = new ParticipatesInService();
const hasRoleService = new HasRoleService();
const ParticipatesInSchema = createSchema({
    typeDefs: /* GraphQL */ `
    type Mutation {
      addMemberToProject(memberEmail: String!, codeProject: String!, role: String!): Boolean
      addTeamToProject(teamName: String!, codeProject: String!): Boolean
      removeMemberFromProject(memberEmail: String!, codeProject: String!): Boolean
      removeTeamFromProject(teamName: String!, codeProject: String!): Boolean
    }
  `,
  resolvers: {
    Mutation: {
      addMemberToProject: async (_, { memberEmail, codeProject , role}) => {
        await hasRoleService.addMemberRole(memberEmail,role);
        await hasRoleService.addRoleToProject(codeProject,role);
        return await participatesInService.addMemberToProject(memberEmail, codeProject);
      },
      addTeamToProject: async (_, { teamName, codeProject }) => {
        return await participatesInService.addTeamToProject(teamName, codeProject);
      },
      removeMemberFromProject: async (_, { memberEmail, codeProject }) => {
        return await participatesInService.removeMemberFromProject(memberEmail, codeProject);
      },
      removeTeamFromProject: async (_, { teamName, codeProject }) => {
        return await participatesInService.removeTeamFromProject(teamName, codeProject);
      },
    },
  },
});

export default ParticipatesInSchema;