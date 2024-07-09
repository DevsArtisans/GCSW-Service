import driver from "../config/Neo4j";
import type { ActivityImplementation } from "../models/ActivityImplementation";
import type { Phase } from "../models/Phase";

class PhaseService {
    async createPhase(name: string, description: string, startDate: string, finalDate: string): Promise<Phase | null> {
        if (!name || name === "") return null;
        try {
            const session = driver.session();
            const result = await session.run(
                `MERGE (p:Phase {name: $name, description: $description, startDate: $startDate, finalDate: $finalDate}) 
         RETURN p`,
                { name, description, startDate, finalDate }
            );
            const singleRecord = result.records[0];
            if (!singleRecord) {
                return null;
            }
            const node = singleRecord.get(0);
            return {
                ...node.properties
            } as Phase;
        } catch (error) {
            console.error("Error creating phase:", error);
            return null;
        }
    }

    async getActivityImplementationByPhaseAndProject(phaseName: string, code: string): Promise<ActivityImplementation[] | null> {
        const session = driver.session();
        try {
            const result = await session.run(
                `MATCH (pr:ActivityProject {code: $code})-[:HAS_PHASE]->(p:Phase {name: $phaseName})<-[:IS_ASSIGNED_TO]-(ai:ActivityImplementation)
                 RETURN ai`,
                { phaseName, code }
            );
    
            if (result.records.length === 0) return null;
    
            return result.records.map(record => record.get(0).properties as ActivityImplementation);
        } catch (error) {
            console.error("Error fetching activity implementation by phase and project:", error);
            return null;
        } finally {
            await session.close();
        }
    }
    
    async getPhases(): Promise<Phase[] | null> {
        try {
            const session = driver.session();
            const result = await session.run("MATCH (p:Phase) RETURN p");
            return result.records.map(record => {
                const node = record.get(0);
                return {
                    ...node.properties
                } as Phase;
            });
        } catch (error) {
            console.error("Error getting phases:", error);
            return null;
        }
    }
}

export default PhaseService;
