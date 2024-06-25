import { createSchema } from "graphql-yoga";
import IsAssignedToService from "../services/IsAssignedToService";

const isAssignedToService = new IsAssignedToService();

const IsAssignedToSchema = createSchema({
  typeDefs: /* GraphQL */ `

        type Query{
            getAssignedMembersToActivityImplementation(code: String!): [Member]
        }
        type Mutation{
            assignMemberToActivityImplementation(memberEmail:String!,code: String!): Boolean
            removeMemberFromActivityImplementation(memberEmail:String!,code: String!): Boolean
        }
      `,
  resolvers: {
    Query: {
      getAssignedMembersToActivityImplementation: async (_, { code }) => {
        return await isAssignedToService.getAssignedMembersByActivityImplementation(code);
      },
    },
    Mutation: {
      assignMemberToActivityImplementation: async (_, { memberEmail, code }) => {
        return await isAssignedToService.assignMemberToActivityImplementation(memberEmail, code);
      },
      removeMemberFromActivityImplementation: async (_, { memberEmail, code }) => {
        return await isAssignedToService.removeMemberFromActivityImplementation(memberEmail, code);

      },
    },
  },
});
export default IsAssignedToSchema;