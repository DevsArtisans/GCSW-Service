import { mergeSchemas } from 'graphql-yoga';
import MemberSchema from './MemberSchema';
import TeamSchema from './TeamSchema';
import ActivityImplementationSchema from './ActivityImplementationSchema';
import MemberOfSchema from './MemberOfSchema';
import ActivityProjectSchema from './ActivityProjectSchema';

const schema = mergeSchemas({
    schemas: [
        MemberSchema,
        TeamSchema,
        ActivityImplementationSchema,
        MemberOfSchema,
        ActivityProjectSchema
    ]
});

export default schema;