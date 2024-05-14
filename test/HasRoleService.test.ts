import { describe, expect, test } from "bun:test";
import HasRoleService from "../src/services/HasRoleService";

const hasRoleService = new HasRoleService();

describe("HasRoleService", () => {
  
  test("Add Member Role", 
  async () => {
    const memberEmail = "validate@gmail.com";
    const role = "Admin";
    const result = await hasRoleService.addMemberRole(memberEmail, role);
    expect(result).toBe(true);
  });

  test("Add Member Role - Member not found", async () => {
    const memberEmail = "notvalidemail@gmail.com";
    const role = "Admin";
    const result = await hasRoleService.addMemberRole(memberEmail, role);
    expect(result).toBe(false);
  });

  test("Add Member Role - Role not found", async () => {
    const memberEmail = "poresteos@gmail.com";
    const role = "NonexistentRole";
    const result = await hasRoleService.addMemberRole(memberEmail, role);
    expect(result).toBe(false);
  });

  test("Remove Member Role", async () => {
    const memberEmail = "validate@gmail.com";
    const role = "Admin";
    const result = await hasRoleService.removeMemberRole(memberEmail, role);
    expect(result).toBe(true);
  });

  test("Remove Member Role - Member or Role not found", async () => {
    const memberEmail = "nonexistentmember@example.com";
    const role = "Admin";
    const result = await hasRoleService.removeMemberRole(memberEmail, role);
    expect(result).toBe(false);
  });

  test("Remove Member Role - Relationship not found", async () => {
    const memberEmail = "testmember@example.com";
    const role = "NonexistentRole";
    const result = await hasRoleService.removeMemberRole(memberEmail, role);
    expect(result).toBe(false);
  });
});

