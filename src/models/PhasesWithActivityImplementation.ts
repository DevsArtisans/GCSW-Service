import type { ActivityImplementation } from "./ActivityImplementation"

export interface PhaseProv {
    name: string
    description: string
    startDate: string
    finalDate: string
    activityImplementations: [ActivityImplementation];
}

export interface PhasesWithActivityImplementations {
    phase: [PhaseProv]
}