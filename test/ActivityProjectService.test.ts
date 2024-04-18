import { expect, describe, test } from "bun:test";
import ActivityProjectService from "../src/services/ActivityProjectService";

const activityProjectService = new ActivityProjectService();

describe("ActivityProjectService", () => {
    test("Create Activity Project", async () => {
        const activityProject = {
            code: "APP-1",
            name: "Proyecto de Prueba",
            description: "Proyecto de prueba para test",
            status: "En Proceso",
            methodology: "RUP",
            creationDate: "2024-06-01",
            startDate: "2024-06-01",
            finalDate: "2024-06-30",
        };
        const result = await activityProjectService.createActivityProject(activityProject);
        expect(result?.code).toBe("APP-1");
    });

    test("Get Activity Project By code", async () => {
        const code = "APP-1";
        const result = await activityProjectService.getActivityProjectByCode(code);
        expect(result?.name).toBe("Proyecto de Prueba");
    });

    test("Get Activity Project By Code - not found", async () => {
        const code = "APP-2";
        
        const result = await activityProjectService.getActivityProjectByCode(code);
        expect(result).toBe(null);
    });

    test("Get Projects from Member Email", async () => {
        const memberEmail = "em2020066321@virtual.upt.pe";
        const result = await activityProjectService.getProjectsByMemberEmail(memberEmail);
        expect(result).toBeDefined();
        expect(result!.length).toBeGreaterThan(0);
    });

    test("Get Projects from Member Email - not found", async () => {
        const memberEmail = "usernotfound@gmail.com";
        const result = await activityProjectService.getProjectsByMemberEmail(memberEmail);
        expect(result).toBeDefined();
        expect(result!.length).toBe(0);
    });
});