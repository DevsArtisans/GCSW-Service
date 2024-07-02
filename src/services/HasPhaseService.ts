import driver from "../config/Neo4j";

class HasPhaseService {
    
    async addPhaseToProject(phaseName: string, projectCode: string): Promise<boolean> {
        const session = driver.session();
        try {
            const phaseResult = await session.run(
                `MATCH (p:Phase {name: $phaseName})
                 RETURN p`,
                { phaseName }
            );
            const projectResult = await session.run(
                `MATCH (pr:Project {code: $projectCode})
                 RETURN pr`,
                { projectCode }
            );
            if(phaseResult.records.length === 0 || projectResult.records.length === 0) return false;
            await session.run(
                `MATCH (p:Phase {name: $phaseName})
                 MATCH (pr:Project {code: $projectCode})
                 MERGE (p)<-[:HAS_PHASE]-(pr)`,
                {
                    phaseName,
                    projectCode,
                },
            );
            return true;
        } catch (error) {
            console.error("Error adding phase to project:", error);
            return false;
        }
    }
}

export default HasPhaseService;