// src/types.ts

export interface SchemeDataLightResponse {
    id: string;
    name: string;
}

export interface SchemeDataFullResponse {
    id: string;
    name: string;
    regulators: Regulator[];
    sections: Section[];
    regulationUnits: RegulationUnit[];
}

// Existing types
export interface Section {
    id: string;
    name: string;
    number: number;
}

export interface Regulator {
    id: string;
    name: string;
    number: number;
}

export interface RegulationUnit {
    id: string;
    name: string;
    regulators: Regulator[];
}

// Interfaces for creation requests
export interface SchemeDataRequest {
    name: string;
}

export interface SectionRequest {
    name: string;
    number: number;
}

export interface RegulatorRequest {
    name: string;
    number: number;
}

export interface RegulationUnitRequest {
    name: string;
}
  