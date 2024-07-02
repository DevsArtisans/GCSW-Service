import driver from "../config/Neo4j";

class ChangeRequestService {
    async addChangeRequest(data: string) {
        const session = driver.session();
        try {
            
            await session.run(
                `CREATE (cr:ChangeRequest {
          code: $code,
          date: $date,
          objective: $objective,
          description: $description,
          element: $element,
          impact: $impact,
          effort: $effort,
          status: $status,
          observation: $observation,
          projectManagerDate: $projectManagerDate,
          implementationDate: $implementationDate,
          versionDate: $versionDate,
          closeDate: $closeDate
        })`,
                data
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

    async updateChangeRequest(code: string, data: string) {
        const session = driver.session();
        try {
            await session.run(
                `MATCH (cr:ChangeRequest {code: $code})
         SET cr += $data`,
                { code, data }
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
