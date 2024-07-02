import driver from "../config/Neo4j";

class HasRequestedService {
  async addMemberToChangeRequest(memberEmail: string, code: string): Promise<boolean> {
    const session = driver.session();
    try{
      const memberResult = await session.run(
        `MATCH (m:Member {email: $memberEmail})
         RETURN m`,
        { memberEmail }
      );
      const changeRequestResult = await session.run(
        `MATCH (cr:ChangeRequest {code: $code})
         RETURN cr`,
        { code }
      );
      if (memberResult.records.length === 0 || changeRequestResult.records.length === 0) return false;
      await session.run(
        `MATCH (m:Member {email: $memberEmail})
         MATCH (cr:ChangeRequest {code: $code})
         MERGE (m)-[:HAS_REQUESTED]->(cr)`,
        {
          memberEmail,
          code,
        },
      );
      return true;
    }catch (error) {
      console.error("Error assigning member to change request:", error);
      return false;
    }
  }

  async addActivityProjectToChangeRequest(activityProjectCode: string, changeRequestCode: string): Promise<boolean> {
    const session = driver.session();
    try{
      const activityProjectResult = await session.run(
        `MATCH (ap:ActivityProject {code: $activityProjectCode})
         RETURN ap`,
        { activityProjectCode }
      );
      const changeRequestResult = await session.run(
        `MATCH (cr:ChangeRequest {code: $changeRequestCode})
         RETURN cr`,
        { changeRequestCode }
      );
      if (activityProjectResult.records.length === 0 || changeRequestResult.records.length === 0) return false;
      await session.run(
        `MATCH (ap:ActivityProject {code: $activityProjectCode})
         MATCH (cr:ChangeRequest {code: $changeRequestCode})
         MERGE (ap)-[:HAS_REQUESTED]->(cr)`,
        {
          activityProjectCode,
          changeRequestCode,
        },
      );
      return true;
    }catch (error) {
      console.error("Error assigning activity project to change request:", error);
      return false;
    }
  }

  async removeMemberFromChangeRequest(memberEmail: string, code: string): Promise<boolean> {
    const session = driver.session();
    try {
      const memberResult = await session.run(
        `MATCH (m:Member {email: $memberEmail})
         RETURN m`,
        { memberEmail }
      );

      const changeRequestResult = await session.run(
        `MATCH (cr:ChangeRequest {code: $code})
         RETURN cr`,
        { code }
      );

      if (memberResult.records.length === 0 || changeRequestResult.records.length === 0) return false;

      await session.run(
        `MATCH (m:Member {email: $memberEmail})-[r:HAS_REQUESTED]->(cr:ChangeRequest {code: $code})
          DELETE r`,
        {
          memberEmail,
          code,
        },
      );
      return true;
    } catch (error) {
      console.error("Error removing member from change request:", error);
      return false;
    }
  }

  async removeActivityProjectFromChangeRequest(activityProjectCode: string, changeRequestCode: string): Promise<boolean> {
    const session = driver.session();
    try{
      const activityProjectResult = await session.run(
        `MATCH (ap:ActivityProject {code: $activityProjectCode})
         RETURN ap`,
        { activityProjectCode }
      );
      const changeRequestResult = await session.run(
        `MATCH (cr:ChangeRequest {code: $changeRequestCode})
         RETURN cr`,
        { changeRequestCode }
      );
      if (activityProjectResult.records.length === 0 || changeRequestResult.records.length === 0) return false;
      await session.run(
        `MATCH (ap:ActivityProject {code: $activityProjectCode})-[r:HAS_REQUESTED]->(cr:ChangeRequest {code: $changeRequestCode})
          DELETE r`,
        {
          activityProjectCode,
          changeRequestCode,
        },
      );
      return true;
    }catch(error){
      console.error("Error removing activity project from change request:", error);
      return false;
    }
  }
}

export default HasRequestedService;