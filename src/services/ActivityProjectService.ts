import type { ActivityProject } from "../models/ActivityProject";
import driver from "../config/Neo4j";

class ActivityProjectService {

  async createActivityProject(activityProject: ActivityProject): Promise<ActivityProject | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MERGE (a:ActivityProject {code: $code})
        ON CREATE SET a.name = $name, 
          a.description = $description, 
          a.status = $status, 
          a.methodology = $methodology, 
          a.creationDate = $creationDate,
          a.startDate = $startDate, 
          a.finalDate = $finalDate
        RETURN a`,
        {
          code: activityProject.code,
          name: activityProject.name,
          description: activityProject.description,
          status: activityProject.status,
          methodology: activityProject.methodology,
          creationDate: activityProject.creationDate,
          startDate: activityProject.startDate,
          finalDate: activityProject.finalDate,
        }
      );

      if (result.records.length === 0) {
        throw new Error("No activity project was created.");
      }

      const singleRecord = result.records[0];
      const node = singleRecord.get(0).properties;

      return {
        ...activityProject,
      };
    } catch (error) {
      console.error("Error creating activity project:", error);
      return null;
    }
  }

  async getActivityProjectByCode(code: string): Promise<ActivityProject | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (a:ActivityProject {code: $code}) RETURN a`,
        { code }
      );
      if (result.records.length === 0) return null;

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      return node.properties as ActivityProject;
    } catch (error) {
      console.error("Error retrieving activity project by code:", error);
      return null;
    }
  }

  async getProjectsByMemberEmail(memberEmail: string): Promise<ActivityProject[] | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (m:Member {email: $memberEmail})-[:PARTICIPATES_IN]->(a:ActivityProject) 
         OPTIONAL MATCH (a)<-[:PARTICIPATES_IN]-(t:Team)
         RETURN a, t`,
        { memberEmail }
      );

      return result.records.map((record) => {
        const projectNode = record.get(0).properties;
        const teamNode = record.get(1)?.properties || null;

        return {
          ...projectNode,
          teamName: teamNode ? teamNode.name : null,
        } as ActivityProject;
      });
    } catch (error) {
      console.error("Error retrieving projects by member email:", error);
      return null;
    }
  }

  async getProjectsByTeamName(teamName: string): Promise<ActivityProject[] | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (t:Team {name: $teamName})-[:PARTICIPATES_IN]->(a:ActivityProject) 
         RETURN a`,
        { teamName }
      );

      return result.records.map((record) => {
        const projectNode = record.get(0).properties;

        return {
          ...projectNode,
        } as ActivityProject;
      });
    } catch (error) {
      console.error("Error retrieving projects by team name:", error);
      return null;
    }
  }
}


export default ActivityProjectService;