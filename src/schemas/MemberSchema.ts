import { createSchema } from "graphql-yoga"
import MemberService from "../services/MemberService"

const memberService = new MemberService()

const MemberSchema = createSchema({
  typeDefs: /* GraphQL */ `
        type Member {
            name: String!
            email: String!
        }
        type Role {
            name: String!
        }
        type MemberWithRole {
            member: Member
            role: Role
        }

        type Query {
          getMemberByEmail(email: String!): Member
          getMembersByTeam(teamName: String!): [Member]
          getMembersByProject(codeProject: String!): [MemberWithRole]
        }
        type Mutation{
          createMember(name:String!,email: String!): Member    
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
      getMembersByProject: async(_,{codeProject}) =>{
        return await memberService.getMembersByProject(codeProject)
      },
    },
    Mutation: {
      createMember: async(_,{name,email,role}) =>{
        return await memberService.createMember({name,email})
      },
    }
  },
});

export default MemberSchema;