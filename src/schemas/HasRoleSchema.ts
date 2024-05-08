import { createSchema } from "graphql-yoga";
import HasRoleService from "../services/HasRoleService";

const hasRoleService = new HasRoleService();

const HasRoleSchema = createSchema({
  typeDefs: /* GraphQL */ `
    type Mutation {
      addMemberRole(memberEmail: String!, role: String!): Boolean
      removeMemberRole(memberEmail: String!, role: String!): Boolean
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
    },
  },
});

export default HasRoleSchema;
