import { expect, describe, test } from "bun:test";
import ActivityImplementationService from "../src/services/ActivityImplementationService";

const activityImplementationService = new ActivityImplementationService();

describe("ActivityImplementationService", () => {
    test("Create Activity Implementation", async () => {
        const activityImplementation = {
            code: "AIMPL-1",
            name: "Implementación de Prueba",
            description: "Implementación de prueba para test",
            status: "En Proceso",
            priority: "Alta",
            creationDate: "2024-06-01",
            startDate: "2024-06-01",
            finalDate: "2024-06-30",
        };
        const result = await activityImplementationService.createActivityImplementation(activityImplementation);
        expect(result?.code).toBe("AIMPL-1");
    });

    test("Get Activity Implementation By Code", async () => {
        const code = "AIMPL-1";
        const result = await activityImplementationService.getActivityImplementationByCode(code);
        expect(result?.name).toBe("Implementación de Prueba");
    });

    test("Get Activity Implementation By Code - not found", async () => {
        const code = "AIMPL-2";
        const result = await activityImplementationService.getActivityImplementationByCode(code);
        expect(result).toBe(null);
    });

    test("Get Implementations by Project Code", async () => {
        const projectCode = "APP-1";
        const result = await activityImplementationService.getImplementationsByProjectCode(projectCode);
        expect(result).toBeDefined();
        expect(result!.length).toBeGreaterThan(0);
    });

    test("Get Implementations by Project Code - not found", async () => {
        const projectCode = "APP-2";
        const result = await activityImplementationService.getImplementationsByProjectCode(projectCode);
        
        expect(result).toBeDefined();
        expect(result!.length).toBe(0);
    });
});
