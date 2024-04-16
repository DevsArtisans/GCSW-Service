import driver from "../config/Neo4j";

class MemberOfService {

  async addMemberToTeam(memberEmail: string, teamName: string): Promise<boolean> {
    const session = driver.session();
    try {
      await session.run(
        `MATCH (m:Member {email: $memberEmail})
            MATCH (t:Team {name: $teamName})
            MERGE (m)-[:MEMBER_OF]->(t)`,
        {
          memberEmail,
          teamName,
        },
      );
      return true;
    } catch (error) {
      console.error("Error adding member to team:", error);
      return false;
    } finally {
      await session.close();
    }
  }

  async removeMemberFromTeam(memberEmail: string, teamName: string): Promise<boolean> {
    const session = driver.session();
    try {
      await session.run(
        `MATCH (m:Member {email: $memberEmail})-[r:MEMBER_OF]->(t:Team {name: $teamName})
            DELETE r`,
        {
          memberEmail,
          teamName,
        },
      );
      return true;
    } catch (error) {
      console.error("Error removing member from team:", error);
      return false;
    } finally {
      await session.close();
    }
  }
}

export default MemberOfService;