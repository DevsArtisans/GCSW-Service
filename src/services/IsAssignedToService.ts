import driver from "../config/Neo4j";
import type { Member } from "../models/Member";

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

  async addActivityToPhase(activityCode: string, phaseName: string): Promise<boolean> {
    const session = driver.session();
    try {
      const activityResult = await session.run(
        `MATCH (a:ActivityImplementation {code: $activityCode})
         RETURN a`,
        { activityCode }
      );
      const phaseResult = await session.run(
        `MATCH (p:Phase {name: $phaseName})
         RETURN p`,
        { phaseName }
      );
      if (activityResult.records.length === 0 || phaseResult.records.length === 0) return false;
      await session.run(
        `MATCH (a:ActivityImplementation {code: $activityCode})
         MATCH (p:Phase {name: $phaseName})
         MERGE (a)-[:IS_ASSIGNED_TO]->(p)`,
        {
          activityCode,
          phaseName,
        },
      );
      return true;
    } catch (error) {
      console.error("Error assigning activity to phase:", error);
      return false;
    }
  
  }

  async removeMemberFromActivityImplementation(memberEmail: string, code: string): Promise<boolean> {
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
        `MATCH (m:Member {email: $memberEmail})-[r:IS_ASSIGNED_TO]->(a:ActivityImplementation {code: $code})
          DELETE r`,
        {
          memberEmail,
          code,
        },
      );
      return true;
    } catch (error) {
      console.error("Error removing role from member:", error);
      return false;
    }
  }

  async getAssignedMembersByActivityImplementation(code: string): Promise<Member[] | null> {
    const session = driver.session();
    try {

      const activityResult = await session.run(
        `MATCH (a:ActivityImplementation {code: $code})
        RETURN a`,
        { code }
      );

      if (activityResult.records.length === 0) return null;

      const result = await session.run(
        `MATCH (m:Member)-[:IS_ASSIGNED_TO]->(a:ActivityImplementation {code: $code})
        RETURN m`,
        { code }
      );
      return result.records.map(record => record.get("m").properties as Member);
    } catch (error) {
      console.error("Error getting members assigned to activity:", error);
      return null;
    };

  }
}

export default IsAssignedToService;