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
import IncludesSchema from './IncludesSchema';
import IsAssignedToSchema from './IsAssignedToSchema';
import PhaseSchema from './PhaseSchema';
import ChangeRequestSchema from './ChangeRequestSchema';
import HasRequestedSchema from './HasRequestedSchema';
const schema = mergeSchemas({
    schemas: [
        MemberSchema,
        TeamSchema,
        IncludesSchema,
        ActivityImplementationSchema,
        MemberOfSchema,
        ActivityProjectSchema,
        HealthSchema,
        RoleSchema,
        HasRoleSchema,
        ParticipatesInSchema,
        IsAssignedToSchema,
        PhaseSchema,
        ChangeRequestSchema,
        HasRequestedSchema
    ]
});

export default schema;