import {expect, describe, test} from "bun:test";
import MemberOfService from "../src/services/MemberOfService";

const memberOfService = new MemberOfService();

describe("MemberOfService", () => {
  test("Add Member to Team", async () => {
    const memberEmail = "sebastian@gmail.com";
    const teamName = "Eskere";
    const result = await memberOfService.addMemberToTeam(memberEmail, teamName);
    expect(result).toBeTruthy();
  });

  test("Add Member to Team 2", async () => {
    const memberEmail = "sebastian@gmail.com";
    const teamName = "PT-GCSW";
    const result = await memberOfService.addMemberToTeam(memberEmail, teamName);
    expect(result).toBeTruthy();
  });

  test("Remove Member from Team", async () => {
    const memberEmail = "da2019063853@virtual.upt.pe";
    const teamName = "Equipo Dinamita 2";
    const result = await memberOfService.removeMemberFromTeam(memberEmail, teamName);
    expect(result).toBeTruthy();
  });
});