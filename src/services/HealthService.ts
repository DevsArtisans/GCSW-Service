import driver from "../config/Neo4j";

class HealthService{
    async checkNeo4jConnection():Promise<boolean>{
        const session = driver.session();
        try{
            await session.run('MATCH (n) RETURN n LIMIT 1');
            return true;
        }catch(error){
            console.error("Error checking Neo4j connection",error);
            return false;
        }
    }
}

export default HealthService;
