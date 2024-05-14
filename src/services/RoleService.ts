import type { Role } from "../models/Role";
import driver from "../config/Neo4j";

class RoleService {

    async createRole(name: string) {
        if(!name || name=="") return null;
        try {
            const session = driver.session();
            const result = await session.run("MERGE(r:Role{name: $name}) RETURN r", {
                name: name,
            });
            const singleRecord = result.records[0];
            if (!singleRecord) {
                return null;
            }
            const node = singleRecord.get(0);
            return {
                ...node.properties
            } as Role;
        } catch (error) {
            console.error("Error creating role", error);
            return null;
        }
    }

    async getMemberRole(memberEmail: string) {
        try {
            const session = driver.session();
            const result = await session.run(
                `MATCH (m:Member {email: $memberEmail})-[:HAS_ROLE]->(r:Role)
                 RETURN r`,
                { memberEmail }
            );
            const singleRecord = result.records[0];
            if (!singleRecord) {
                return null;
            }
            const roleNode = singleRecord.get(0);
            return {
                ...roleNode.properties
            } as Role;
        } catch (error) {
            console.error("Error retrieving Member Role", error);
            return null;
        }
    }
}

export default RoleService;