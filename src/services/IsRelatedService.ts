import driver from "../config/Neo4j";
import type { ActivityImplementation } from "../models/ActivityImplementation";

class IsRelatedService {
    async createRelation(sourceCode: string, targetCode: string): Promise<boolean> {
        const session = driver.session();
        try {
            await session.run(
                `MATCH (source:ActivityImplementation {code: $sourceCode}), (target:ActivityImplementation {code: $targetCode})
                 MERGE (source)-[:IS_RELATED_TO]->(target)
                 RETURN source, target`,
                { sourceCode, targetCode }
            );
            return true;
        } catch (error) {
            console.error("Error creating relation:", error);
            return false;
        }
    }

    async getRelatedActivities(code: string): Promise<ActivityImplementation[] | null> {
        const session = driver.session();
        try {
            const result = await session.run(
                `MATCH (activity:ActivityImplementation {code: $code})-[:IS_RELATED_TO*1..]->(related:ActivityImplementation)
                 RETURN distinct related`,
                { code }
            );

            if (result.records.length === 0) return null;

            return result.records.map(record => record.get('related').properties as ActivityImplementation);
        } catch (error) {
            console.error("Error fetching related activities:", error);
            return null;
        }
    }
}

export default IsRelatedService;
