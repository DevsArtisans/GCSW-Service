import { createSchema } from "graphql-yoga"
import TeamService from "../services/TeamService";
import MemberOfService from "../services/MemberOfService";

const teamService = new TeamService();
const memberOfService = new MemberOfService();

const TeamSchema = createSchema({
  typeDefs: /* GraphQL */ `
        type Team {
            name: String!
            description: String!
            leader: String!
        }

        type Query {
          getTeamByName(name: String!): Team
          getTeamsByUserEmail(email: String!): [Team]
        }
        type Mutation{
          createTeam(name:String!,description: String!, leader:String!): Team    
        }
      `,
  resolvers: {
    Query: {
      getTeamByName: async(_,{name}) =>{
        return await teamService.getTeamByName(name)
      },
      getTeamsByUserEmail: async(_,{email}) =>{
        return await teamService.getTeams(email)
      },
    },
    Mutation: {
      createTeam: async(_,{name,description,leader}) =>{
        const response = await teamService.createTeam({name,description,leader});
        await memberOfService.addMemberToTeam(leader,name);
        return response;
      },
    }
  },
});

export default TeamSchema;