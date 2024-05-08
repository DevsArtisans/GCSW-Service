import { createSchema } from "graphql-yoga";
import RoleService from "../services/RoleService";

const roleService = new RoleService();

const RoleSchema = createSchema({
  typeDefs: /* GraphQL */ `
    type Role {
      name: String!
    }

    type Mutation {
      createRole(name: String!): Role
    }

    type Query {
      getMemberRole(memberEmail: String!): Role
    }
  `,
  resolvers: {
    Mutation: {
      createRole: async (_, { name }) => {
        return await roleService.createRole(name);
      },
    },
    Query: {
      getMemberRole: async (_, { memberEmail }) => {
        return await roleService.getMemberRole(memberEmail);
      },
    },
  },
});

export default RoleSchema;
