import type { Team } from "../models/Team";
import driver from "../config/Neo4j";

class TeamService {
  async createTeam(team: Team): Promise<Team | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MERGE (t:Team {name: $name})
        ON CREATE SET t.description = $description, t.leader = $leader
        RETURN t`,
        {
          name: team.name,
          description: team.description,
          leader: team.leader,
        },
      );
      const singleRecord = result.records[0];
      const node = singleRecord.get(0);
      return {
        ...node.properties,
      } as Team;
    } catch (error) {
      console.error("Error creating team:", error);
      return null;
    }
  }
  async getTeamByName(name: string): Promise<Team | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (t:Team {name: $name}) RETURN t`,
        { name },
      );
      if (result.records.length === 0) return null;

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      return node.properties as Team;
    } catch (error) {
      console.error("Error retrieving team by name:", error);
      return null;
    }
  }
  async getTeams(memberEmail:string): Promise<Team[] | null> {
    const session = driver.session();
    try{
      const result = await session.run(
        `MATCH( member:Member {email: $memberEmail})-[:MEMBER_OF]->(team:Team) RETURN team`,
        {memberEmail: memberEmail}
      );
      if (result.records.length === 0) return null;
      return result.records.map(record => record.get('team').properties as Team);
    }catch(error){
      console.error("Error retrieving teams by user email:", error);
      return null;
    }
  }
}

export default TeamService;
