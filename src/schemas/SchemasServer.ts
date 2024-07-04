import { mergeSchemas } from 'graphql-yoga';
import ActivityImplementationSchema from './ActivityImplementationSchema';
import ActivityProjectSchema from './ActivityProjectSchema';
import ChangeRequestSchema from './ChangeRequestSchema';
import HasPhaseSchema from './HasPhaseSchemas';
import HasRequestedSchema from './HasRequestedSchema';
import HasRoleSchema from './HasRoleSchema';
import HealthSchema from './HealthSchema';
import IncludesSchema from './IncludesSchema';
import IsAssignedToSchema from './IsAssignedToSchema';
import MemberOfSchema from './MemberOfSchema';
import MemberSchema from './MemberSchema';
import ParticipatesInSchema from './ParticipatesInSchema';
import PhaseSchema from './PhaseSchema';
import RoleSchema from './RoleSchema';
import TeamSchema from './TeamSchema';
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
        HasRequestedSchema,
        HasPhaseSchema
    ]
});

export default schema;