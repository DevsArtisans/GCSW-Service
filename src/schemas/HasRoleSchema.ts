import { createSchema } from "graphql-yoga";
import HasRoleService from "../services/HasRoleService";

const hasRoleService = new HasRoleService();

const HasRoleSchema = createSchema({
  typeDefs: /* GraphQL */ `
    type Mutation {
      addMemberRole(memberEmail: String!, role: String!): Boolean
      removeMemberRole(memberEmail: String!, role: String!): Boolean
      addRoleToProject(projectCode: String!, role: String!): Boolean
      removeRoleFromProject(projectCode: String!, role: String!): Boolean
    }
  `,
  resolvers: {
    Mutation: {
      addMemberRole: async (_, { memberEmail, role }) => {
        return await hasRoleService.addMemberRole(memberEmail, role);
      },
      removeMemberRole: async (_, { memberEmail, role }) => {
        return await hasRoleService.removeMemberRole(memberEmail, role);
      },
      addRoleToProject: async (_, { projectCode, role }) => {
        return await hasRoleService.addRoleToProject(projectCode, role);
      },
      removeRoleFromProject: async (_, { projectCode, role }) => {
        return await hasRoleService.removeRoleFromProject(projectCode, role);
      },
    },
  },
});

export default HasRoleSchema;
