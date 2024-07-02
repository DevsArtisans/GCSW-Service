import type { Member } from "../models/Member";
import driver from "../config/Neo4j";
import type { MemberWithRole } from "../models/MemberWithRole";
import type { Role } from "../models/Role";
class MemberService {
  
  async createMember(member: Member): Promise<Member | null> {
    
    try {
      const session = driver.session();
      const result = await session.run(
        `MERGE (m:Member {email: $email})
        ON CREATE SET m.name = $name
        RETURN m`,
        {
          name: member.name,
          email: member.email,
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
    }
  }
  async getMembersAssignedToImplementation(implementationCode: string): Promise<Member[] | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (ai:ActivityImplementation {code: $implementationCode})<-[:IS_ASSIGNED_TO]-(m:Member) 
         RETURN m`,
        { implementationCode }
      );

      return result.records.map((record) => {
        const memberNode = record.get(0).properties;
        return {
          ...memberNode,
        } as Member;
      });

    } catch (error) {
      console.error("Error retrieving members assigned to implementation:", error);
      return null
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
    } 
  }

  async getMembersByProject(codeProject: string): Promise<MemberWithRole[] | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (p:ActivityProject {code: $codeProject})
        MATCH (members:Member)-[:PARTICIPATES_IN]->(p)
        OPTIONAL MATCH (members)-[:HAS_ROLE]->(r:Role)
        WHERE EXISTS { MATCH (p)-[:REQUIRES_ROLE]->(r) }
        RETURN members, r
          `,
        { codeProject }
      );
  
      if (result.records.length === 0) return null;
      const member = result.records.map(record => record.get('members').properties as Member);
      const role = result.records.map(record => record.get('r').properties as Role);

      const membersWithRole = member.map((member, index) => {
        return {
          member,
          role: role[index] || null
        } as MemberWithRole;
      });

        
      return membersWithRole;
    } catch (error) {
      console.error("Error retrieving members by project code:", error);
      return null;
    }
  }

  async getMembersByTeam(teamName: string): Promise< Member[] | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (members:Member)-[:MEMBER_OF]->(t:Team {name: $teamName})
        OPTIONAL MATCH (members)-[:HAS_ROLE]->(r:Role)
        RETURN members, r
        `,
        { teamName }
      );

      if (result.records.length === 0) return null;

      return result.records.map(record => record.get('members').properties as Member);
    } catch (error) {
      console.error("Error retrieving members by team name:", error);
      return null;
    }
  }
}

export default MemberService;
