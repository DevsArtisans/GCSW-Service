import { expect, describe, test } from "bun:test";
import ActivityImplementationService from "../src/services/ActivityImplementationService";
import type { ActivityImplementation } from "../src/models/ActivityImplementation";
const activityImplementationService = new ActivityImplementationService();

describe("ActivityImplementationService", () => {
  test("createActivityImplementation", async () => {
    const activityImplementation: ActivityImplementation = {
      name: "Test Activity",
      description: "Test Activity Description",
      status: "Pending",
      priority: "Low",
      creationDate: "08-04-2024",
      startDate: "08-04-2024",
      finalDate: "08-04-2024",
    };
    const createdActivityImplementation =
      await activityImplementationService.createActivityImplementation(
        activityImplementation
      );
    expect(createdActivityImplementation).toBeDefined();
    expect(createdActivityImplementation!.name).toBe(
      activityImplementation.name
    );
    expect(createdActivityImplementation!.description).toBe(
      activityImplementation.description
    );
    expect(createdActivityImplementation!.status).toBe(
      activityImplementation.status
    );
    expect(createdActivityImplementation!.priority).toBe(
      activityImplementation.priority
    );
    expect(createdActivityImplementation!.creationDate).toStrictEqual(
      activityImplementation.creationDate
    );
    expect(createdActivityImplementation!.startDate).toStrictEqual(
      activityImplementation.startDate
    );
    expect(createdActivityImplementation!.finalDate).toStrictEqual(
      activityImplementation.finalDate
    );
  });

  test("getActivityImplementationByName", async () => {
    const name = "Test Activity";
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByName(name);
    expect(activityImplementation).toBeDefined();
    expect(activityImplementation!.name).toBe(name);
  });

  test("getActivityImplementationByName - not found", async () => {
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByName(
        "nonexistent"
      );
    expect(activityImplementation).toBeNull();
  });

  test("getActivityImplementationByStatus", async () => {
    const status = "Pending";
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByStatus(
        status
      );
    expect(activityImplementation).toBeDefined();
    expect(activityImplementation!.status).toBe(status);
  });

  test("getActivityImplementationByStatus - not found", async () => {
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByStatus(
        "nonexistent"
      );
    expect(activityImplementation).toBeNull();
  });

  test("getActivityImplementationByPriority", async () => {
    const priority = "Low";
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByPriority(
        priority
      );
    expect(activityImplementation).toBeDefined();
    expect(activityImplementation!.priority).toBe(priority);
  });

  test("getActivityImplementationByPriority - not found", async () => {
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByPriority(
        "nonexistent"
      );
    expect(activityImplementation).toBeNull();
  });

  test("getActivityImplementationByCreationDate", async () => {
    const creationDate = "08-04-2024";
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByCreationDate(
        creationDate
      );
    expect(activityImplementation).toBeDefined();
    expect(activityImplementation![0].creationDate).toStrictEqual(creationDate);
  });

  test("getActivityImplementationByCreationDate - not found", async () => {
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByCreationDate(
        "09-04-2024"
      );
    expect(activityImplementation).toBeNull();
  });

  test("getActivityImplementationByStartDate", async () => {
    const startDate = "08-04-2024";
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByStartDate(
        startDate
      );
    expect(activityImplementation).toBeDefined();
    expect(activityImplementation!.startDate).toStrictEqual(startDate);
  });

  test("getActivityImplementationByStartDate - not found", async () => {
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByStartDate(
        "09-04-2024"
      );
    expect(activityImplementation).toBeNull();
  });

  test("getActivityImplementationByFinalDate", async () => {
    const finalDate = "08-04-2024";
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByFinalDate(
        finalDate
      );
    expect(activityImplementation).toBeDefined();
    expect(activityImplementation!.finalDate).toStrictEqual(finalDate);
  });

  test("getActivityImplementationByFinalDate - not found", async () => {
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByFinalDate(
        "09-04-2024"
      );
    expect(activityImplementation).toBeNull();
  });

  test("updateActivityImplementation", async () => {
    const name = "Test Activity";
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByName(name);
    expect(activityImplementation).toBeDefined();
    activityImplementation!.status = "In Progress";
    const updatedActivityImplementation =
      await activityImplementationService.updateActivityImplementation(
        name,
        activityImplementation!
      );
    expect(updatedActivityImplementation).toBeDefined();
    expect(updatedActivityImplementation!.status).toBe("In Progress");
  });

  test("deleteActivityImplementation", async () => {
    const name = "Test Activity";
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByName(name);
    expect(activityImplementation).toBeDefined();
    const deletedActivityImplementation =
      await activityImplementationService.deleteActivityImplementation(name);
    expect(deletedActivityImplementation).toBeDefined();
    expect(deletedActivityImplementation).toBe(true);
  });

  test("deleteActivityImplementation - not found", async () => {
    const name = "Test Activity 2";
    const activityImplementation =
      await activityImplementationService.getActivityImplementationByName(name);
    expect(activityImplementation).toBeNull();
    const deletedActivityImplementation =
      await activityImplementationService.deleteActivityImplementation(name);

    expect(deletedActivityImplementation).toBeTruthy();
  });
});
