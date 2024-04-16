import { mergeSchemas } from 'graphql-yoga';
import MemberSchema from './MemberSchema';
import TeamSchema from './TeamSchema';
import ActivityImplementationSchema from './ActivityImplementationSchema';
import MemberOfSchema from './MemberOfSchema';

const schema = mergeSchemas({
    schemas: [
        MemberSchema,
        TeamSchema,
        ActivityImplementationSchema,
        MemberOfSchema,
    ]
});

export default schema;