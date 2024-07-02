import { createSchema } from "graphql-yoga";
import ChangeRequestService from "../services/ChangeRequestService";

const changeRequestService = new ChangeRequestService();

const ChangeRequestSchema = createSchema({
    typeDefs: /* GraphQL */ `
    type ChangeRequest {
      code: String!
      date: String!
      objective: String!
      description: String!
      element: String!
      impact: String!
      effort: String!
      status: String
      observation: String
      projectManagerDate: String
      implementationDate: String
      versionDate: String
      closeDate: String
    }

    input ChangeRequestInput {
      code: String!
      date: String!
      objective: String!
      description: String!
      element: String!
      impact: String!
      effort: String!
      status: String
      observation: String!
      projectManagerDate: String!
      implementationDate: String!
      versionDate: String!
      closeDate: String!
    }

    type Query {
      getChangeRequestByCode(code: String!): ChangeRequest
    }

    type Mutation {
      addChangeRequest(data: ChangeRequestInput!): Boolean
      updateChangeRequest(code: String!, data: ChangeRequestInput!): Boolean
      deleteChangeRequest(code: String!): Boolean
      updateChangeRequestStatus(code: String!, status: String!): Boolean
    }
  `,
    resolvers: {
        Query: {
            getChangeRequestByCode: async (_, { code }) => {
                return await changeRequestService.getChangeRequestByCode(code);
            },
        },
        Mutation: {
            addChangeRequest: async (_, { data }) => {
                return await changeRequestService.addChangeRequest(data);
            },
            updateChangeRequest: async (_, { code, data }) => {
                return await changeRequestService.updateChangeRequest(code, data);
            },
            deleteChangeRequest: async (_, { code }) => {
                return await changeRequestService.deleteChangeRequest(code);
            },
            updateChangeRequestStatus: async (_, { code, status }) => {
                return await changeRequestService.updateChangeRequestStatus(code, status);
            },
        },
    },
});

export default ChangeRequestSchema;
