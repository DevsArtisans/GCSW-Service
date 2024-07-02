import driver from "../config/Neo4j";
import type { Phase } from "../models/Phase";

class PhaseService{   
    async createPhase(name: string,description: string,startDate: string,finalDate: string) {
        if(!name || name=="") return null;
        try {
            const session = driver.session();
            const result = await session.run("MERGE(p:Phase{name: $name, description: $description, startDate: $startDate, finalDate: $finalDate}) RETURN p", {
                name: name,
                description: description,
                startDate: startDate,
                finalDate: finalDate
            });
            const singleRecord = result.records[0];
            if (!singleRecord) {
                return null;
            }
            const node = singleRecord.get(0);
            return {
                ...node.properties
            } as Phase;
        } catch (error) {
            console.error("Error creating role", error);
            return null;
        }
    }

    async getPhases() {
        try{
            const session = driver.session();
            const result = await session.run("MATCH(p:Phase) RETURN p");
            return result.records.map(record => {
                const node = record.get(0);
                return {
                    ...node.properties
                } as Phase;
            });
        }catch(error){
            console.error("Error getting phases", error);
            return null;
        }
    }
}
export default PhaseService;