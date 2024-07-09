import driver from "../config/Neo4j";
import type { ActivityImplementation } from "../models/ActivityImplementation";
import type { Member } from "../models/Member";
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

  async getActivityImplementationsByTeam(teamName: string): Promise<{ activityImplementation: ActivityImplementation, assignedUsers: Member[] }[] | null> {
    const session = driver.session();
    try {
      const result = await session.run( 
        `MATCH (t:Team {name: $teamName})-[:PARTICIPATES_IN]->(ap:ActivityProject)-[:INCLUDES]->(ai:ActivityImplementation)
             OPTIONAL MATCH (ai)<-[:IS_ASSIGNED_TO]-(u:Member)
             RETURN ai, collect(u) AS assignedUsers`,
        { teamName }
      );

      if (result.records.length === 0) return null;

      return result.records.map(record => {
        const activityImplementation = record.get('ai').properties as ActivityImplementation;
        const assignedUsers = record.get('assignedUsers').map((user: any) => user.properties as Member);
        return { activityImplementation, assignedUsers };
      });
    } catch (error) {
      console.error("Error fetching activity implementations by team:", error);
      return null;
    } finally {
      await session.close();
    }
  }

  async getActivityImplementationsByMember(email: string): Promise<ActivityImplementation[] | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (m:Member {email: $email})-[:IS_ASSIGNED_TO]->(ai:ActivityImplementation)
         RETURN ai`,
        { email }
      );

      if (result.records.length === 0) return null;

      return result.records.map(record => record.get('ai').properties as ActivityImplementation);
    } catch (error) {
      console.error("Error fetching activity implementations by member:", error);
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

  async getActivityImplementationsByPhase(phaseName: string): Promise<ActivityImplementation[] | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (p:Phase {name: $phaseName})-[:INCLUDES]->(ai:ActivityImplementation) 
         RETURN ai`,
        { phaseName }
      );

      return result.records.map((record) => {
        const implementationNode = record.get(0).properties;
        return {
          ...implementationNode,
        } as ActivityImplementation;
      });
    } catch (error) {
      console.error("Error retrieving implementations by phase:", error);
      return null;
    }
  }

  async updateActivityImplementationStatus(code: string, status: string): Promise<boolean> {
    const session = driver.session();
    try {
      const implementationExists = await this.getActivityImplementationByCode(code);
      if (!implementationExists) return false;
      await session.run(
        `MATCH (ai:ActivityImplementation {code: $code})
         SET ai.status = $status
         RETURN ai`,
        { code, status }
      );
      return true;
    } catch (error) {
      console.error("Error updating activity implementation status:", error);
      return false;
    }
  }
}

export default ActivityImplementationService;
