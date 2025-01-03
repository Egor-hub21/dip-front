import axios from "axios";
import {
  CalculationGroupRequest,
  CalculationGroupLightResponse,
  CalculationGroupFullResponse,
} from "../types/CalculationGroups";
import { CalculationFullResponse, CalculationRequest } from "../types/Calculation";

const apiUrl = "https://localhost:7243/api";

export const createCalculationGroup = async (
  payload: CalculationGroupRequest
): Promise<string> => {
  try {
    const response = await axios.post(`${apiUrl}/calculationgroup`, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating CalculationGroup:", error);
    throw new Error("Error creating CalculationGroup");
  }
};

export const fetchCalculationGroups = async (): Promise<
  CalculationGroupLightResponse[]
> => {
  try {
    const response = await axios.get<CalculationGroupLightResponse[]>(
      `${apiUrl}/calculationgroup`
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    throw new Error("Ошибка при загрузке данных");
  }
};

export const fetchCalculationGroupDetails = async (
  id: string
): Promise<CalculationGroupFullResponse> => {
  const response = await axios.get<CalculationGroupFullResponse>(
    `${apiUrl}/calculationgroup/${id}`
  );
  return response.data;
};

export const addCalculationToGroup = async (
  groupId: string,
  calculation: CalculationRequest
): Promise<string> => {
  try {
    const response = await axios.post(
      `${apiUrl}/calculationgroup/${groupId}/calculations`,
      calculation
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка добавления расчета:", error);
    throw new Error("Ошибка добавления расчета");
  }
};

export const startCalculation = async (
  calculationId: string
): Promise<void> => {
  try {
    const response = await axios.put(
      `${apiUrl}/calculation/${calculationId}/start`
    );
    if (response.status !== 200) {
      throw new Error(`Ошибка запуска расчета: ${response.status}`);
    }
  } catch (error) {
    console.error("Ошибка запуска расчета:", error);
    throw new Error("Ошибка запуска расчета");
  }
};

export const getCalculation = async (
  id: string
): Promise<CalculationFullResponse> => {
  try {
    const response = await axios.get<CalculationFullResponse>(
      `${apiUrl}/calculation/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка получения расчета:", error);
    throw new Error("Ошибка получения расчета");
  }
};
