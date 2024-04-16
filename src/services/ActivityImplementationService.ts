import type { ActivityImplementation } from "../models/ActivityImplementation";
import driver from "../config/Neo4j";

class ActivityImplementationService {
  async createActivityImplementation(
    activityImplementation: ActivityImplementation
  ): Promise<ActivityImplementation | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `CREATE (a:ActivityImplementation {
            name: $name, description: $description, status: $status,
            priority: $priority, creationDate: $creationDate,
            startDate: $startDate, finalDate: $finalDate
          }) RETURN a`,
        {
          name: activityImplementation.name,
          description: activityImplementation.description,
          status: activityImplementation.status,
          priority: activityImplementation.priority,
          creationDate: activityImplementation.creationDate,
          startDate: activityImplementation.startDate,
          finalDate: activityImplementation.finalDate,
        }
      );

      if (result.records.length === 0) {
        throw new Error("No activity implementation was created.");
      }

      const singleRecord = result.records[0];
      const node = singleRecord.get(0).properties;

      return {
        ...activityImplementation,
      };
    } catch (error) {
      console.error("Error creating activity implementation:", error);
      return null;
    } finally {
      await session.close();
    }
  }
  async getActivityImplementationByName(
    name: string
  ): Promise<ActivityImplementation | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (a:ActivityImplementation {name: $name}) RETURN a`,
        { name }
      );
      if (result.records.length === 0) return null;

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      return node.properties as ActivityImplementation;
    } catch (error) {
      console.error("Error retrieving activity implementation by name:", error);
      return null;
    } finally {
      await session.close();
    }
  }

  async getActivityImplementationByStatus(
    status: string
  ): Promise<ActivityImplementation | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (a:ActivityImplementation {status: $status}) RETURN a`,
        { status }
      );
      if (result.records.length === 0) return null;

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      return node.properties as ActivityImplementation;
    } catch (error) {
      console.error(
        "Error retrieving activity implementation by status:",
        error
      );
      return null;
    } finally {
      await session.close();
    }
  }

  async getActivityImplementationByPriority(
    priority: string
  ): Promise<ActivityImplementation | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (a:ActivityImplementation {priority: $priority}) RETURN a`,
        { priority }
      );
      if (result.records.length === 0) return null;

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      return node.properties as ActivityImplementation;
    } catch (error) {
      console.error(
        "Error retrieving activity implementation by priority:",
        error
      );
      return null;
    } finally {
      await session.close();
    }
  }

  async getActivityImplementationByCreationDate(
    creationDate: string
  ): Promise<ActivityImplementation[] | null> {
    const session = driver.session();
    try {
      const startOfDay = creationDate;
      const endOfDay = creationDate;

      const result = await session.run(
        `MATCH (a:ActivityImplementation)
         WHERE a.creationDate >= $startOfDay AND a.creationDate <= $endOfDay
         RETURN a`,
        { startOfDay, endOfDay }
      );

      if (result.records.length === 0) return null;

      return result.records.map((record) => {
        const node = record.get("a").properties;
        return {
          ...node,
        } as ActivityImplementation;
      });
    } catch (error) {
      console.error(
        "Error retrieving activity implementation by creation date:",
        error
      );
      return null;
    } finally {
      await session.close();
    }
  }

  async getActivityImplementationByStartDate(
    startDate: string
  ): Promise<ActivityImplementation | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (a:ActivityImplementation {startDate: $startDate}) RETURN a`,
        { startDate }
      );
      if (result.records.length === 0) return null;

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      return node.properties as ActivityImplementation;
    } catch (error) {
      console.error(
        "Error retrieving activity implementation by start date:",
        error
      );
      return null;
    } finally {
      await session.close();
    }
  }

  async getActivityImplementationByFinalDate(
    finalDate: string
  ): Promise<ActivityImplementation | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (a:ActivityImplementation {finalDate: $finalDate}) RETURN a`,
        { finalDate }
      );
      if (result.records.length === 0) return null;

      const singleRecord = result.records[0];
      const node = singleRecord.get(0);

      return node.properties as ActivityImplementation;
    } catch (error) {
      console.error(
        "Error retrieving activity implementation by final date:",
        error
      );
      return null;
    } finally {
      await session.close();
    }
  }

  async updateActivityImplementation(
    name: string,
    activityImplementation: ActivityImplementation
  ): Promise<ActivityImplementation | null> {
    const session = driver.session();
    try {
      const result = await session.run(
        `MATCH (a:ActivityImplementation {name: $name})
        SET a.description = $description, a.status = $status, a.priority = $priority, a.creationDate = $creationDate, a.startDate = $startDate, a.finalDate = $finalDate
        RETURN a`,
        {
          name,
          description: activityImplementation.description,
          status: activityImplementation.status,
          priority: activityImplementation.priority,
          creationDate: activityImplementation.creationDate,
          startDate: activityImplementation.startDate,
          finalDate: activityImplementation.finalDate,
        }
      );
      const singleRecord = result.records[0];
      const node = singleRecord.get(0);
      return {
        ...node.properties,
      } as ActivityImplementation;
    } catch (error) {
      console.error("Error updating activity implementation:", error);
      return null;
    } finally {
      await session.close();
    }
  }

  async deleteActivityImplementation(name: string): Promise<boolean> {
    const session = driver.session();
    try {
      await session.run(
        `MATCH (a:ActivityImplementation {name: $name}) DETACH DELETE a`,
        { name }
      );
      return true;
    } catch (error) {
      console.error("Error deleting activity implementation:", error);
      return false;
    } finally {
      await session.close();
    }
  }
}

export default ActivityImplementationService;
