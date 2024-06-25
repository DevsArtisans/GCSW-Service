import driver from "../config/Neo4j";

class IsAssignedToService {


  async assignMemberToActivityImplementation(memberEmail: string, code: string): Promise<boolean> {
    const session = driver.session();
    try {
      const memberResult = await session.run(
        `MATCH (m:Member {email: $memberEmail})
         RETURN m`,
        { memberEmail }
      );
      const activityResult = await session.run(
        `MATCH (a:ActivityImplementation {code: $code})
         RETURN a`,
        { code }
      );
      if (memberResult.records.length === 0 || activityResult.records.length === 0) return false;
      await session.run(
        `MATCH (m:Member {email: $memberEmail})
         MATCH (a:ActivityImplementation {code: $code})
         MERGE (m)-[:IS_ASSIGNED_TO]->(a)`,
        {
          memberEmail,
          code,
        },
      );
      return true;
    } catch (error) {
      console.error("Error assigning member to activity:", error);
      return false;
    }
  }

  async removeMemberFromActivity (memberEmail: string, code: string): Promise<boolean> {
    const session = driver.session();
    try {
      const memberResult = await session.run(
        `MATCH (m:Member {email: $memberEmail})
         RETURN m`,
        { memberEmail }
      );
      const roleResult = await session.run(
        `MATCH (r:Role {name: $role})
         RETURN r`,
        { role }
      );
      if (memberResult.records.length === 0 || roleResult.records.length === 0) return false;
      await session.run(
        `MATCH (m:Member {email: $memberEmail})-[hr:HAS_ROLE]->(r:Role {name: $role})
            DELETE hr`,
        {
          memberEmail,
          role,
        },
      );
      return true;
    } catch (error) {
      console.error("Error removing role from member:", error);
      return false;
    }
  }
}

export default HasRoleService;