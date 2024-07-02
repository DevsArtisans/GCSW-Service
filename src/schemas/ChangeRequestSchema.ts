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
      status: String!
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
      addChangeRequest(
        code: String!,
        date: String!,
        objective: String!,
        description: String!,
        element: String!,
        impact: String!,
        effort: String!,
        status: String!,
        observation: String!,
        projectManagerDate: String!,
        implementationDate: String!,
        versionDate: String!,
        closeDate: String!
      ): Boolean
      updateChangeRequest(
        code: String!,
        date: String!,
        objective: String!,
        description: String!,
        element: String!,
        impact: String!,
        effort: String!,
        status: String!,
        observation: String!,
        projectManagerDate: String!,
        implementationDate: String!,
        versionDate: String!,
        closeDate: String!
      ): Boolean
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
      addChangeRequest: async (
        _,
        {
          code,
          date,
          objective,
          description,
          element,
          impact,
          effort,
          status,
          observation,
          projectManagerDate,
          implementationDate,
          versionDate,
          closeDate
        }
      ) => {
        return await changeRequestService.addChangeRequest(
          code,
          date,
          objective,
          description,
          element,
          impact,
          effort,
          status,
          observation,
          projectManagerDate,
          implementationDate,
          versionDate,
          closeDate
        );
      },
      updateChangeRequest: async (
        _,
        {
          code,
          date,
          objective,
          description,
          element,
          impact,
          effort,
          status,
          observation,
          projectManagerDate,
          implementationDate,
          versionDate,
          closeDate
        }
      ) => {
        return await changeRequestService.updateChangeRequest(
          code,
          date,
          objective,
          description,
          element,
          impact,
          effort,
          status,
          observation,
          projectManagerDate,
          implementationDate,
          versionDate,
          closeDate
        );
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
