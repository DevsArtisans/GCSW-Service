import neo4j from 'neo4j-driver';
import 'dotenv/config';

const uri = process.env.NEO4J_URI!;
const user = process.env.NEO4J_USER || 'neo4j';
const password = process.env.NEO4J_PASSWORD!;
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

export default driver;