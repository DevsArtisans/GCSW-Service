import { createSchema } from "graphql-yoga";
import HealthService from "../services/HealthService";

const healthService = new HealthService();

const HealthSchema = createSchema({
    typeDefs: /* GraphQL */ `
      type Query {
        healthCheck: String!
      }
    `,
    resolvers: {
      Query: {
        healthCheck: async () => {
          const neo4jConnected = await healthService.checkNeo4jConnection();
          if (neo4jConnected) {
            return 'Healthy';
          } else {
            return 'Unhealthy';
          }
        }
      }
    }
  });
  
export default HealthSchema;