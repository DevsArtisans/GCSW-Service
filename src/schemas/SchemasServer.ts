import { mergeSchemas } from 'graphql-yoga';
import MemberSchema from './MemberSchema';
import TeamSchema from './TeamSchema';
import ActivityImplementationSchema from './ActivityImplementationSchema';
import MemberOfSchema from './MemberOfSchema';
import ActivityProjectSchema from './ActivityProjectSchema';
import HealthSchema from './HealthSchema';
import RoleSchema from './RoleSchema';
import HasRoleSchema from './HasRoleSchema';
import ParticipatesInSchema from './ParticipatesInSchema';
const schema = mergeSchemas({
    schemas: [
        MemberSchema,
        TeamSchema,
        ActivityImplementationSchema,
        MemberOfSchema,
        ActivityProjectSchema,
        HealthSchema,
        RoleSchema,
        HasRoleSchema,
        ParticipatesInSchema
    ]
});

export default schema;