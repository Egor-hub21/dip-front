import axios from "axios";
import {
  SchemeDataFullResponse,
  SchemeDataLightResponse,
  SectionRequest,
  RegulatorRequest,
  RegulationUnitRequest,
  Regulator,
} from "../types/schemeData";

const API_URL = "https://localhost:7243/api"; // Основной URL API
const API_URL_SCHEME = `${API_URL}/schemedata`;
const API_URL_SECTION = `${API_URL}/section`;
const API_URL_REGULATOR = `${API_URL}/regulator`;
const API_URL_REGULATION_UNIT = `${API_URL}/regulationunit`;

export const getAllSchemes = async (): Promise<SchemeDataLightResponse[]> => {
  const response = await axios.get<SchemeDataLightResponse[]>(API_URL_SCHEME);
  return response.data;
};

export const getSchemeById = async (
  id: string
): Promise<SchemeDataFullResponse> => {
  const response = await axios.get<SchemeDataFullResponse>(
    `${API_URL_SCHEME}/${id}`
  );
  return response.data;
};

export const deleteSchemeById = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL_SCHEME}/${id}`);
};
export const deleteSectionById = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL_SECTION}/${id}`);
};
export const deleteRegulatorById = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL_REGULATOR}/${id}`);
};
export const deleteRegulationUnitById = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL_REGULATION_UNIT}/${id}`);
};

export const updateRegulators = async (
  regulationUnitId: string,
  regulatorsIds: string[]
) => {
  await axios.put(
    `${API_URL_REGULATION_UNIT}/${regulationUnitId}/regulators`,
    regulatorsIds
  );
};

export const createScheme = async (name: string): Promise<string> => {
  return await axios.post(API_URL_SCHEME, { name });
};

export const createSection = async (
  schemeId: string,
  section: SectionRequest
): Promise<void> => {
  await axios.post(`${API_URL_SCHEME}/${schemeId}/sections`, section);
};

export const createRegulator = async (
  schemeId: string,
  regulator: RegulatorRequest
): Promise<void> => {
  await axios.post(`${API_URL_SCHEME}/${schemeId}/regulators`, regulator);
};

export const createRegulationUnit = async (
  schemeId: string,
  regulationUnit: RegulationUnitRequest
): Promise<void> => {
  await axios.post(
    `${API_URL_SCHEME}/${schemeId}/regulation-units`,
    regulationUnit
  );
};

export const getFreeRegulatorsBySchemeId = async (
  id: string
): Promise<Regulator[]> => {
  const response = await axios.get<Regulator[]>(
    `${API_URL_SCHEME}/${id}/regulators/free`
  );
  return response.data;
};

export const readSchemaFromFile = async (
  schemeId: string,
  fileId: string
): Promise<void> => {
  await axios.post(`${API_URL_SCHEME}/${schemeId}/read-files/${fileId}`);
}

