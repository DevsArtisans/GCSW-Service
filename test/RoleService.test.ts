import { describe, expect, test } from "bun:test";
import RoleService from "../src/services/RoleService";

const roleService = new RoleService();

describe("RoleService", () => {

  test("Create Role", async () => {
    const roleName = "Admin";
    const role = await roleService.createRole(roleName);
    expect(role).toBeDefined();
    expect(role!.name).toBe(roleName);
  });

  test("Create Role - Duplicate Role", async () => {
    const roleName = "Admin";
    await roleService.createRole(roleName); 
    const role = await roleService.createRole(roleName);
    expect(role).toBeDefined();
    expect(role!.name).toBe(roleName);
  });

  test("Create Role - Error", async () => {
    const roleName = "";
    const role = await roleService.createRole(roleName);
    expect(role).toBeNull();
  });

  test("Get Member Role", async () => {
    const memberEmail = "testmember@example.com";
    const role = await roleService.getMemberRole(memberEmail);
    expect(role).toBeDefined();
  });

  test("Get Member Role - Member not found", async () => {
    const memberEmail = "nonexistentmember@example.com";
    const role = await roleService.getMemberRole(memberEmail);
    expect(role).toBeNull();
  });

});

