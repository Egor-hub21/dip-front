export interface CalculationRequest{
    name: string;
    regimeFileId: string;
}

export interface CalculationResultResponse{
    name: string;
    freeReserve: number;
    lockedReserve: number;
    influence: number;
}

export interface CalculationLightResponse{
    id: string;
    name: string;
    fileId: string;
    fileName: string;
}

export interface CalculationFullResponse{
    id: string;
    name: string;
    results: CalculationResultResponse[];
}