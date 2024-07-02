import driver from "../config/Neo4j";

class ChangeRequestService {
    async addChangeRequest(code: string, date: string, objective: string, description: string, element: string, impact: string, effort: string, status: string, observation: string, projectManagerDate: string, implementationDate: string, versionDate: string, closeDate: string) {
        const session = driver.session();
        try {

            await session.run(
                `
          MERGE (cr:ChangeRequest {code: $code})
          ON CREATE SET cr.code = $code,
            cr.date = $date,
            cr.objective = $objective,
            cr.description = $description,
            cr.element = $element,
            cr.impact = $impact,
            cr.effort = $effort,
            cr.status = $status,
            cr.observation = $observation,
            cr.projectManagerDate = $projectManagerDate,
            cr.implementationDate = $implementationDate,
            cr.versionDate = $versionDate,
            cr.closeDate = $closeDate
            RETURN cr
        `,
                {
                    code,
                    date,
                    objective,
                    description,
                    element,
                    impact,
                    effort,
                    status,
                    observation,
                    projectManagerDate,
                    implementationDate,
                    versionDate,
                    closeDate
                }
            );

            return true;
        } catch (error) {
            console.error("Error adding change request:", error);
            return false;
        }
    }

    async getChangeRequestByCode(code: string) {
        const session = driver.session();
        try {
            const result = await session.run(
                `MATCH (cr:ChangeRequest {code: $code})
         RETURN cr`,
                { code }
            );
            return result.records.length > 0 ? result.records[0].get('cr').properties : null;
        } catch (error) {
            console.error("Error fetching change request:", error);
            return null;
        }
    }

    async getChangeRequestsByProject(code: string) {
        const session = driver.session();
        try {
            const result = await session.run(
                `MATCH (p:ActivityProject {code: $code})-[:HAS_REQUESTED]->(cr:ChangeRequest)
            RETURN cr`,
                    { code }
            );
            return result.records.map(record => record.get('cr').properties);
        } catch (error) {
            console.error("Error fetching change requests:", error);
            return null;
        }
    }

    async updateChangeRequest(code: string, date: string, objective: string, description: string, element: string, impact: string, effort: string, status: string, observation: string, projectManagerDate: string, implementationDate: string, versionDate: string, closeDate: string) {
        const session = driver.session();
        try {
            const changeRequestExists = await this.getChangeRequestByCode(code);
            if (!changeRequestExists) return false;
            await session.run(
                `MATCH (cr:ChangeRequest {code: $code})
         SET cr += $data`,
                { code, data: { date, objective, description, element, impact, effort, status, observation, projectManagerDate, implementationDate, versionDate, closeDate } }
            );
            return true;
        } catch (error) {
            console.error("Error updating change request:", error);
            return false;
        }
    }

    async deleteChangeRequest(code: string) {
        const session = driver.session();
        try {
            await session.run(
                `MATCH (cr:ChangeRequest {code: $code})
         DELETE cr`,
                { code }
            );
            return true;
        } catch (error) {
            console.error("Error deleting change request:", error);
            return false;
        }
    }

    async updateChangeRequestStatus(code: string, status: string) {
        const session = driver.session();
        try {
            await session.run(
                `MATCH (cr:ChangeRequest {code: $code})
         SET cr.status = $status`,
                { code, status }
            );
            return true;
        } catch (error) {
            console.error("Error updating change request status:", error);
            return false;
        }
    }
}

export default ChangeRequestService;
