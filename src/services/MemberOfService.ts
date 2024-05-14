import driver from "../config/Neo4j";

class MemberOfService {

  async addMemberToTeam(memberEmail: string, teamName: string): Promise<boolean> {
    const session = driver.session();
    try {
      const memberResult = await session.run(
        `MATCH (m:Member {email: $memberEmail})
         RETURN m`,
        { memberEmail }
      );
      const teamResult = await session.run(
        `MATCH (t:Team {name: $teamName})
         RETURN t`,
        { teamName }
      );
      
      if(memberResult.records.length === 0 || teamResult.records.length === 0) return false;

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
    }
  }
}

export default MemberOfService;