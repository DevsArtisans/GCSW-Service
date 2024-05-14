import { describe, expect, test } from "bun:test";
import ParticipatesInService from "../src/services/ParticipatesInService";

const participatesInService = new ParticipatesInService();

describe("ParticipatesInService", () => {
  
  test("Add Member to Project", async () => {
    const memberEmail = "validate@gmail.com";
    const codeProject = "APP-1";
    const result = await participatesInService.addMemberToProject(memberEmail, codeProject);
    expect(result).toBe(true);
  });

  test("Add Member to Project - Member not found", async () => {
    const memberEmail = "nonexistentmember@example.com";
    const codeProject = "Project123";
    const result = await participatesInService.addMemberToProject(memberEmail, codeProject);
    expect(result).toBe(false);
  });

  test("Add Member to Project - Project not found", async () => {
    const memberEmail = "validate@gmail.com";
    const codeProject = "NonexistentProject";
    const result = await participatesInService.addMemberToProject(memberEmail, codeProject);
    expect(result).toBe(false);
  });

  test("Add Team to Project", async () => {
    const teamName = "Eskere";
    const codeProject = "APP-1";
    const result = await participatesInService.addTeamToProject(teamName, codeProject);
    expect(result).toBe(true);
  });

  test("Add Team to Project - Team not found", async () => {
    const teamName = "NonexistentTeam";
    const codeProject = "Project123";
    const result = await participatesInService.addTeamToProject(teamName, codeProject);
    expect(result).toBe(false);
  });

  test("Add Team to Project - Project not found", async () => {
    const teamName = "TeamA";
    const codeProject = "NonexistentProject";
    const result = await participatesInService.addTeamToProject(teamName, codeProject);
    expect(result).toBe(false);
  });

  test("Remove Member from Project", async () => {
    const memberEmail = "validate@gmail.com";
    const codeProject = "APP-1";
    const result = await participatesInService.removeMemberFromProject(memberEmail, codeProject);
    expect(result).toBe(true);
  });

  test("Remove Member from Project - Member or Project not found", async () => {
    const memberEmail = "nonexistentmember@example.com";
    const codeProject = "Project123";
    const result = await participatesInService.removeMemberFromProject(memberEmail, codeProject);
    expect(result).toBe(false);
  });

  test("Remove Team from Project", async () => {
    const teamName = "Eskere";
    const codeProject = "APP-1";
    const result = await participatesInService.removeTeamFromProject(teamName, codeProject);
    expect(result).toBe(true);
  });

  test("Remove Team from Project - Team or Project not found", async () => {
    const teamName = "NonexistentTeam";
    const codeProject = "Project123";
    const result = await participatesInService.removeTeamFromProject(teamName, codeProject);
    expect(result).toBe(false);
  });

});

