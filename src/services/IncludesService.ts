import driver from "../config/Neo4j";

class IncludesService {

  async addImplementationToProject(codeImplementation: string, codeProject: string): Promise<boolean> {
    const session = driver.session();
    try {
      const implementationResult = await session.run(
        `MATCH (ai:ActivityImplementation {code: $codeImplementation})
         RETURN ai`,
        { codeImplementation }
      );
      const projectResult = await session.run(
        `MATCH (ap:ActivityProject {code: $codeProject})
         RETURN ap`,
        { codeProject }
      );
      if (implementationResult.records.length === 0 || projectResult.records.length === 0) return false;
      await session.run(
        `MATCH (ai:ActivityImplementation {code: $codeImplementation})
         MATCH (ap:ActivityProject {code: $codeProject})
         MERGE (ap)-[:INCLUDES]->(ai)`,
        {
          codeImplementation,
          codeProject,
        },
      );
      return true;
    } catch (error) {
      console.error("Error adding implementation to project:", error);
      return false;
    }
  }

  async removeImplementationFromProject(codeImplementation: string, codeProject: string): Promise<boolean> {
    const session = driver.session();
    try {
      const implementationResult = await session.run(
        `MATCH (ai:ActivityImplementation {code: $codeImplementation})
         RETURN ai`,
        { codeImplementation }
      );
      const projectResult = await session.run(
        `MATCH (ap:ActivityProject {code: $codeProject})
         RETURN ap`,
        { codeProject }
      );
      if (implementationResult.records.length === 0 || projectResult.records.length === 0) return false;
      await session.run(
        `MATCH (ai:ActivityImplementation {code: $codeImplementation})-[r:INCLUDES]->(ap:ActivityProject {code: $codeProject})
         DELETE r`,
        {
          codeImplementation,
          codeProject,
        },
      );
      return true;
    } catch (error) {
      console.error("Error removing implementation from project:", error);
      return false;
    }
  }
}

export default IncludesService;
