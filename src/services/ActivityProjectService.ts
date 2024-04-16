import type { ActivityProject } from "../models/ActivityProject";
import driver from "../config/Neo4j";

class ActivityProjectService {

  async createActivityProject(activityProject: ActivityProject): Promise<ActivityProject | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `CREATE (a:ActivityProject {
          name: $name, description: $description, status: $status,
          methodology: $methodology, creationDate: $creationDate,
          startDate: $startDate, finalDate: $finalDate
        }) RETURN a`,
        {
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
    } finally {
      await session.close();
    }
  }

  async getActivityProjectByName(name: string): Promise<ActivityProject | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (a:ActivityProject {name: $name}) RETURN a`,
        { name }
      );
      if (result.records.length === 0) return null;

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      return node.properties as ActivityProject;
    } catch (error) {
      console.error("Error retrieving activity project by name:", error);
      return null;
    } finally {
      await session.close();
    }
  }

  async getProjectsByMemberEmail(memberEmail: string): Promise<ActivityProject[] | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (m:Member {email: $memberEmail})-[:PARTICIPATES_IN]->(p:Project)-[:HAS_ACTIVITY_PROJECT]->(a:ActivityProject) RETURN a`,
        { memberEmail }
      );

      return result.records.map((record) => record.get(0).properties as ActivityProject);
    } catch (error) {
      console.error("Error retrieving projects by member email:", error);
      return null;
    } finally {
      await session.close();
    } 
  }
  
}


export default ActivityProjectService;