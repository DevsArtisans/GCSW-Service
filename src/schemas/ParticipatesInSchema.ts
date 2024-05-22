import { createSchema } from "graphql-yoga";
import ParticipatesInService from "../services/ParticipatesInService";

const participatesInService = new ParticipatesInService();

const ParticipatesInSchema = createSchema({
    typeDefs: /* GraphQL */ `
    type Mutation {
      addMemberToProject(memberEmail: String!, codeProject: String!): Boolean
      removeMemberFromProject(memberEmail: String!, codeProject: String!): Boolean 
    }
  `,
  resolvers: {
    Mutation: {
      addMemberToProject: async (_, { memberEmail, codeProject }) => {
        return await participatesInService.addMemberToProject(memberEmail, codeProject);
      },
      removeMemberFromProject: async (_, { memberEmail, codeProject }) => {
        return await participatesInService.removeMemberFromProject(memberEmail, codeProject);
      },
    },
  },
});

export default ParticipatesInSchema;