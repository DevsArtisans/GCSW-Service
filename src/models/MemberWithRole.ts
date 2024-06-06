import type { Member } from "./Member";
import type { Role } from "./Role";


export interface MemberWithRole {
    member: Member;
    role: Role | null;
}