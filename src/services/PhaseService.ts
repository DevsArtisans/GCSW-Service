import driver from "../config/Neo4j";
import type { ActivityImplementation } from "../models/ActivityImplementation";
import type { Phase } from "../models/Phase";
import type { PhaseProv, PhasesWithActivityImplementations } from "../models/PhasesWithActivityImplementation";

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

    async getActivityImplementationByPhase(phaseName: string): Promise<ActivityImplementation[] | null> {
        const session = driver.session();
        try {
            const result = await session.run(
                `MATCH (p:Phase {name: $phaseName})<-[:IS_ASSIGNED_TO]-(ai:ActivityImplementation)
         RETURN ai`,
                { phaseName }
            );

            if (result.records.length === 0) return null;

            return result.records.map(record => record.get(0).properties as ActivityImplementation);

        } catch (error) {
            console.error("Error fetching activity implementation by phase:", error);
            return null;
        }
    }

    async getActivityImplementationInAllPhasesByProject(code: string): Promise<PhasesWithActivityImplementations | null> {
        const session = driver.session();
        try {
            const result = await session.run(
                `MATCH (pr:ActivityProject {code: $code})-[:HAS_PHASE]->(p:Phase)
                 OPTIONAL MATCH (p)<-[:IS_ASSIGNED_TO]-(ai:ActivityImplementation)
                 RETURN p, collect(ai) AS activityImplementations`,
                { code }
            );

            if (result.records.length === 0) return null;

            const phasesWithActivityImplementations: PhasesWithActivityImplementations = {
                phase: []
            };

            for (const record of result.records) {
                const phaseNode = record.get('p');
                const activityImplementations = record.get('activityImplementations');

                const phaseProv: PhaseProv = {
                    name: phaseNode.properties.name,
                    description: phaseNode.properties.description,
                    startDate: phaseNode.properties.startDate,
                    finalDate: phaseNode.properties.finalDate,
                    activityImplementations: activityImplementations.map((ai: any) => ai ? ai.properties as ActivityImplementation : null).filter(ai => ai !== null)
                };

                phasesWithActivityImplementations.phase.push(phaseProv);
            }

            return phasesWithActivityImplementations;
        } catch (error) {
            console.error("Error fetching activity implementation in all phases:", error);
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
