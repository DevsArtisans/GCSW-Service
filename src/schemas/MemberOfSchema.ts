import { createSchema } from "graphql-yoga";
import MemberOfService from "../services/MemberOfService";

const memberOfService = new MemberOfService();

const MemberOfSchema = createSchema({
  typeDefs: /* GraphQL */ `
        type MemberOf {
            memberEmail: String!
            teamName: String!
        }

        type Mutation{
          addMemberToTeam(memberEmail:String!,teamName: String!): Boolean
          removeMemberFromTeam(memberEmail:String!,teamName: String!): Boolean
        }
      `,
  resolvers: {
    Mutation: {
      addMemberToTeam: async (_, { memberEmail, teamName }) => {
        return await memberOfService.addMemberToTeam(memberEmail, teamName);
      },
      removeMemberFromTeam: async (_, { memberEmail, teamName }) => {
        return await memberOfService.removeMemberFromTeam(memberEmail, teamName);
      },
    },
  },
});
export default MemberOfSchema;