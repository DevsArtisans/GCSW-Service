import {expect, describe, test} from "bun:test";
import MemberOfService from "../src/services/MemberOfService";

const memberOfService = new MemberOfService();

describe("MemberOfService", () => {
  test("Add Member to Team", async () => {
    const memberEmail = "validate@gmail.com";
    const teamName = "PT-GCSW";
    const result = await memberOfService.addMemberToTeam(memberEmail, teamName);
    expect(result).toBeTruthy();
  });

  test("Remove Member from Team", async () => {
    const memberEmail = "validate@gmail.com";
    const teamName = "PT-GCSW";
    const result = await memberOfService.removeMemberFromTeam(memberEmail, teamName);
    expect(result).toBeTruthy();
  });
  test("Add Member to Team 2", async () => {
    const memberEmail = "validate@gmail.com";
    const teamName = "PT-GCSW";
    const result = await memberOfService.addMemberToTeam(memberEmail, teamName);
    expect(result).toBeTruthy();
  });
});