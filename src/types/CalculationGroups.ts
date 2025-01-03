import { CalculationLightResponse } from "./Calculation";

export interface CalculationGroupLightResponse {
    id: string;
    name: string;
    description: string;
}

export interface CalculationGroupFullResponse {
    id: string;
    name: string;
    description: string;
    calculations: CalculationLightResponse[];
}

export interface CalculationGroupRequest {
    name: string;
    description: string;
    sectionId: string;
    regulationUnitIds: string[];
}