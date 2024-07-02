import { createSchema } from "graphql-yoga";
import HasRequestedService from "../services/HasRequestedService";

const hasRequestedService = new HasRequestedService();

const HasRequestedSchema = createSchema({
  typeDefs: /* GraphQL */ `
    type Mutation {
      addMemberToChangeRequest(memberEmail: String!, code: String!): Boolean
      removeMemberFromChangeRequest(memberEmail: String!, code: String!): Boolean
      addActivityProjectToChangeRequest(activityProjectCode: String!, changeRequestCode: String!): Boolean
      removeActivityProjectFromChangeRequest(activityProjectCode: String!, changeRequestCode: String!): Boolean
    }
  `,
  resolvers: {
    Mutation: {
      addMemberToChangeRequest: async (_, { memberEmail, code }) => {
        return await hasRequestedService.addMemberToChangeRequest(memberEmail, code);
      },
      removeMemberFromChangeRequest: async (_, { memberEmail, code }) => {
        return await hasRequestedService.removeMemberFromChangeRequest(memberEmail, code);
      },
      addActivityProjectToChangeRequest: async (_, { activityProjectCode, changeRequestCode }) => {
        return await hasRequestedService.addActivityProjectToChangeRequest(activityProjectCode, changeRequestCode);
      },
      removeActivityProjectFromChangeRequest: async (_, { activityProjectCode, changeRequestCode }) => {
        return await hasRequestedService.removeActivityProjectFromChangeRequest(activityProjectCode, changeRequestCode);
      },
    },
  },
});

export default HasRequestedSchema;
