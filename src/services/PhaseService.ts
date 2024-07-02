import driver from "../config/Neo4j";
import type { Phase } from "../models/Phase";
import type { ActivityImplementation } from "../models/ActivityImplementation";
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

                `MATCH (ai:ActivityImplementation)-[:IS_ASSIGNED_TO]->(p:Phase)<-[:HAS_PHASE]-(pr:ActivityProject {code: $code})
         RETURN p, ai`,
                { code });

            if (result.records.length === 0) return null;

            const phases = result.records.map(record => record.get('p').properties as Phase);

            let phasesWithActivityImplementations: PhasesWithActivityImplementations = {
                phase: []
            };
            for (let i = 0; i < phases.length; i++) {
                const phaseProv = phases[i] as PhaseProv;

                const activityImplementation = await this.getActivityImplementationByPhase(phases[i].name);
                phaseProv.activityImplementations = activityImplementation;
                phasesWithActivityImplementations.phase.push(phaseProv);
            }
            return phasesWithActivityImplementations;
        } catch (error) {
            console.error("Error fetching activity implementation in all phases:", error);
            return null;
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
