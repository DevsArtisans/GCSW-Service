import driver from "../config/Neo4j";

class ParticipatesInService {

  async addMemberToProject(memberEmail: string, codeProject: string): Promise<boolean> {
    const session = driver.session();
    try {
      await session.run(
        `MATCH (m:Member {email: $memberEmail})
            MATCH (ap:ActivityProject {codeProject: $codeProject})
            MERGE (m)-[:PARTICIPATES_IN]->(ap)`,
        {
          memberEmail,
          codeProject,
        },
      );
      return true;
    } catch (error) {
      console.error("Error adding member to project:", error);
      return false;
    }
  }
  async addTeamToProject(teamName:string, codeProject: string){
    const session = driver.session();
    try {
        await session.run(
          `MATCH (t:Team {name: $teamName})
              MATCH (ap:ActivityProject {code: $codeProject})
              MERGE (m)-[:PARTICIPATES_IN]->(ap)`,
          {
            teamName,
            codeProject,
          },
        );
        return true;
      } catch (error) {
        console.error("Error adding team to project:", error);
        return false;
      }
  }
  async removeMemberFromProject(memberEmail: string, codeProject: string): Promise<boolean> {
    const session = driver.session();
    try {
      await session.run(
        `MATCH (m:Member {email: $memberEmail})-[r:PARTICIPATES_IN]->(ap:ActivityProject {code: $codeProject})
            DELETE r`,
        {
          memberEmail,
          codeProject,
        },
      );
      return true;
    } catch (error) {
      console.error("Error removing member from project:", error);
      return false;
    }
  }
  async removeTeamFromProject(teamName: string, codeProject: string): Promise<boolean> {
    const session = driver.session();
    try {
      await session.run(
        `MATCH (t:Team {name: $teamName})-[r:PARTICIPATES_IN]->(ap:ActivityProject {code: $codeProject})
            DELETE r`,
        {
          teamName,
          codeProject,
        },
      );
      return true;
    } catch (error) {
      console.error("Error removing team from project:", error);
      return false;
    }
  }
}

export default ParticipatesInService;