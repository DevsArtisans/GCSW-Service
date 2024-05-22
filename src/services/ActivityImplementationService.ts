import type { ActivityImplementation } from "../models/ActivityImplementation";
import driver from "../config/Neo4j";

class ActivityImplementationService {

  async createActivityImplementation(activityImplementation: ActivityImplementation): Promise<ActivityImplementation | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MERGE (ai:ActivityImplementation {code: $code})
        ON CREATE SET ai.name = $name, 
          ai.description = $description, 
          ai.status = $status, 
          ai.priority = $priority, 
          ai.creationDate = $creationDate,
          ai.startDate = $startDate, 
          ai.finalDate = $finalDate
        RETURN ai`,
        {
          code: activityImplementation.code,
          name: activityImplementation.name,
          description: activityImplementation.description,
          status: activityImplementation.status,
          priority: activityImplementation.priority,
          creationDate: activityImplementation.creationDate,
          startDate: activityImplementation.startDate,
          finalDate: activityImplementation.finalDate,
        }
      );

      if (result.records.length === 0) {
        throw new Error("No activity implementation was created.");
      }

      const singleRecord = result.records[0];
      const node = singleRecord.get(0).properties;

      return {
        ...activityImplementation,
      };
    } catch (error) {
      console.error("Error creating activity implementation:", error);
      return null;
    }
  }

  async getActivityImplementationByCode(code: string): Promise<ActivityImplementation | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (ai:ActivityImplementation {code: $code}) RETURN ai`,
        { code }
      );
      if (result.records.length === 0) return null;

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      return node.properties as ActivityImplementation;
    } catch (error) {
      console.error("Error retrieving activity implementation by code:", error);
      return null;
    }
  }

  async getImplementationsByProjectCode(projectCode: string): Promise<ActivityImplementation[] | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (ap:ActivityProject {code: $projectCode})-[:INCLUDES]->(ai:ActivityImplementation) 
         RETURN ai`,
        { projectCode }
      );
      
      return result.records.map((record) => {
        const implementationNode = record.get(0).properties;
        return {
          ...implementationNode,
        } as ActivityImplementation;
      });
    } catch (error) {
      console.error("Error retrieving implementations by project code:", error);
      return null;
    }
  }
}

export default ActivityImplementationService;
