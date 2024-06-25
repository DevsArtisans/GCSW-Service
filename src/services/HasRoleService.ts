import driver from "../config/Neo4j";

class HasRoleService {


  async addMemberRole(memberEmail: string, role: string): Promise<boolean> {
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
        `MATCH (m:Member {email: $memberEmail})
            MATCH (r:Role {name: $role})
            MERGE (m)-[:HAS_ROLE]->(r)`,
        {
          memberEmail,
          role,
        },
      );
      return true;
    } catch (error) {
      console.error("Error adding role to member:", error);
      return false;
    }
  }

  async removeMemberRole(memberEmail: string, role: string): Promise<boolean> {
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

  async addRoleToProject(codeProject: string, role: string): Promise<boolean> {
    const session = driver.session();
    try{
      const projectResult = await session.run(
        `MATCH (p:ActivityProject {code: $codeProject})
         RETURN p`,
        { codeProject }
      );
      const roleResult = await session.run(
        `MATCH (r:Role {name: $role})
         RETURN r`,
        { role }
      );
      if (projectResult.records.length === 0 || roleResult.records.length === 0) return false;
      await session.run(
        `MATCH (p:ActivityProject {code: $codeProject})
        MATCH (r:Role {name: $role})
        MERGE (p)-[:REQUIRES_ROLE]->(r)`,
        {
          codeProject,
          role
        }
      );
      return true;
    }catch(error){
      console.error("Error adding role to project:", error);
      return false;
    }
  }

  async removeRoleFromProject(codeProject: string, role: string): Promise<boolean> {
    const session = driver.session();
    try{
      const projectResult = await session.run(
        `MATCH (p:ActivityProject {code: $codeProject})
         RETURN p`,
        { codeProject }
      );
      const roleResult = await session.run(
        `MATCH (r:Role {name: $role})
         RETURN r`,
        { role }
      );
      if (projectResult.records.length === 0 || roleResult.records.length === 0) return false;
      await session.run(
        `MATCH (p:ActivityProject {code: $codeProject})-[rr:REQUIRES_ROLE]->(r:Role {name: $role})
        DELETE rr`,
        {
          codeProject,
          role
        }
      );
      return true;
    }catch(error){
      console.error("Error removing role from project:", error);
      return false;
    }
  }
}

export default HasRoleService;