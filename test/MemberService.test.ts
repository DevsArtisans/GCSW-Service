import { describe, expect, test } from "bun:test";
import MemberService from "../src/services/MemberService";
import type { Member } from "../src/models/Member";

const memberService = new MemberService();
describe("MemberService", () => {
  test("createMember", async () => {
    const member: Member = {
      name: "Test User",
      email: "validate@gmail.com",
    };
    const createdMember = await memberService.createMember(member);
    expect(createdMember).toBeDefined();
    expect(createdMember!.name).toBe(member.name);
    expect(createdMember!.email).toBe(member.email);
  });

  test("getMemberByEmail", async () => {
    const email = "test.user@gmail.com";
    const member = await memberService.getMemberByEmail(email);
    expect(member).toBeDefined();
    expect(member!.email).toBe(email);
  });

  test("getMemberByEmail - not found", async () => {
    const member = await memberService.getMemberByEmail(
      "nonexistent@gmail.com",
    );
    expect(member).toBeNull();
  });

  test("getMembersByTeam", async () => {
    const teamName = "Equipo ABC";
    const members = await memberService.getMembersByTeam(teamName);
    expect(members).toBeDefined();
    expect(Array.isArray(members)).toBeTruthy();
    expect(members![0].name).toBe("Erick");
  });
});
