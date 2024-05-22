import { expect, describe, test } from "bun:test";
import IncludesService from "../src/services/IncludesService";

const includesServices = new IncludesService();

describe("IncludesService", () => {
    test("Add Implementation to Project", async () => {
        const codeImplementation = "AIMPL-1";
        const codeProject = "APP-1";
        const result = await includesServices.addImplementationToProject(codeImplementation, codeProject);
        expect(result).toBe(true);
    });

    test("Add Implementation to Project - not found", async () => {
        const codeImplementation = "AIMPL-999";
        const codeProject = "APP-999";
        const result = await includesServices.addImplementationToProject(codeImplementation, codeProject);
        expect(result).toBe(false);
    });

    test("Remove Implementation from Project", async () => {
        const codeImplementation = "AIMPL-1";
        const codeProject = "APP-1";
        const result = await includesServices.removeImplementationFromProject(codeImplementation, codeProject);
        expect(result).toBe(true);
    });

    test("Remove Implementation from Project - not found", async () => {
        const codeImplementation = "AIMPL-999";
        const codeProject = "APP-999";
        const result = await includesServices.removeImplementationFromProject(codeImplementation, codeProject);
        expect(result).toBe(false);
    });
});
