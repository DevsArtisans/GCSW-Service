import { createSchema } from "graphql-yoga"
import MemberService from "../services/MemberService"

const memberService = new MemberService()

const MemberSchema = createSchema({
  typeDefs: /* GraphQL */ `
        type Member {
            name: String!
            email: String!
            role: String!
        }

        type Query {
          getMemberByEmail(email: String!): Member
          getMembersByTeam(teamName: String!): [Member]
        }
        type Mutation{
          createMember(name:String!,email: String!, role:String!): Member    
        }
      `,
  resolvers: {
    Query: {
      getMemberByEmail: async(_,{email}) =>{
        return await memberService.getMemberByEmail(email)
      },
      getMembersByTeam: async(_,{teamName}) =>{
        return await memberService.getMembersByTeam(teamName)
      },
    },
    Mutation: {
      createMember: async(_,{name,email,role}) =>{
        return await memberService.createMember({name,email,role})
      },
    }
  },
});

export default MemberSchema;