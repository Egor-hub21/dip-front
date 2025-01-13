import axios from "axios";
import {
  CalculationGroupRequest,
  CalculationGroupLightResponse,
  CalculationGroupFullResponse,
} from "../types/CalculationGroups";
import { CalculationFullResponse, CalculationRequest } from "../types/Calculation";

const apiUrl = "https://localhost:7243/api";

const apiCalculationGroupUrl = `${apiUrl}/calculationgroup`;
const apiCalculationUrl = `${apiUrl}/calculation`;

export const createCalculationGroup = async (
  payload: CalculationGroupRequest
): Promise<string> => {
  try {
    const response = await axios.post(apiCalculationGroupUrl, payload);
    return response.data;
  } catch (error) {
    console.error("Error creating CalculationGroup:", error);
    throw new Error("Error creating CalculationGroup");
  }
};

export const deleteCalculationGroup = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${apiCalculationGroupUrl}/${id}`);
  } catch (error) {
    console.error("Error deleting CalculationGroup:", error);
    throw new Error("Error deleting CalculationGroup");
  }
};

export const deleteRangeCalculationGroup = async (ids: string[]): Promise<void> => {
  try {
    await axios.delete(`${apiCalculationGroupUrl}`, { data: ids });
  } catch (error) {
    console.error("Error deleting CalculationGroup:", error);
    throw new Error("Error deleting CalculationGroup");
  }
}

export const fetchCalculationGroups = async (): Promise<
  CalculationGroupLightResponse[]
> => {
  try {
    const response = await axios.get<CalculationGroupLightResponse[]>(
      apiCalculationGroupUrl
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
    `${apiCalculationGroupUrl}/${id}`
  );
  return response.data;
};

export const addCalculationToGroup = async (
  groupId: string,
  calculation: CalculationRequest
): Promise<string> => {
  try {
    const response = await axios.post(
      `${apiCalculationGroupUrl}/${groupId}/calculations`,
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
      `${apiCalculationUrl}/${calculationId}/start`
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
      `${apiCalculationUrl}/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка получения расчета:", error);
    throw new Error("Ошибка получения расчета");
  }
};

export const deleteCalculation = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${apiCalculationUrl}/${id}`);
  } catch (error) {
    console.error("Error deleting CalculationGroup:", error);
    throw new Error("Error deleting CalculationGroup");
  }
};

export const deleteRangeCalculation = async (ids: string[]): Promise<void> => {
  try {
    await axios.delete(`${apiCalculationUrl}`, { data: ids });
  } catch (error) {
    console.error("Error deleting CalculationGroup:", error);
    throw new Error("Error deleting CalculationGroup");
  }
}

