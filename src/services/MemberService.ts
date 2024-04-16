import type { Member } from "../models/Member";
import driver from "../config/Neo4j";

class MemberService {
  async createMember(member: Member): Promise<Member | null> {
    const session = driver.session();
    try {

      const result = await session.run(
        `MERGE (m:Member {email: $email})
        ON CREATE SET m.name = $name, m.role = $role
        RETURN m`,
        {
          name: member.name,
          email: member.email,
          role: member.role
        }
      );

      const singleRecord = result.records[0];
      if (!singleRecord) {
        return null;
      }
      const node = singleRecord.get(0);
      return {
        ...node.properties
      } as Member;
    } catch (error) {
      console.error("Error creating member:", error);
      return null;
    } finally {
      await session.close();
    }
  }

  async getMemberByEmail(email: string): Promise<Member | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (m:Member {email: $email}) RETURN m`,
        { email }
      );

      if (result.records.length === 0) return null;

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      return node.properties as Member;
    } catch (error) {
      console.error("Error retrieving member by email:", error);
      return null;
    } finally {
      await session.close();
    }
  }

  async getMembersByTeam(teamName: string): Promise<Member[] | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (members:Member)-[:MEMBER_OF]->(t:Team {name: $teamName}) RETURN members`,
        { teamName }
      );

      if (result.records.length === 0) return null;

      return result.records.map(record => record.get('members').properties as Member);
    } catch (error) {
      console.error("Error retrieving members by team name:", error);
      return null;
    } finally {
      await session.close();
    }
  }
}

export default MemberService;
