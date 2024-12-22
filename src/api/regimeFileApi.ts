import axios from 'axios';
import { RegimeFileResponse } from '../types/regimeFile';

const apiUrl = 'https://localhost:7243/api/regimefile';

// Функция для загрузки файла
export const uploadFile = async (file: FormData) => {
  try {
    const response = await axios.post(`${apiUrl}/upload`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // { FilePath: string }
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Функция для получения всех файлов
export const getAllRegimeFiles = async (): Promise<RegimeFileResponse[]> => {
  try {
    const response = await axios.get(`${apiUrl}`);
    return response.data; // Массив файлов
  } catch (error) {
    console.error('Error fetching files:', error);
    throw error;
  }
};

// Функция для скачивания файла
export const downloadFile = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/download/${id}`, {
      responseType: 'blob', // Получаем файл как бинарный объект
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = id; // Установите имя файла
    document.body.appendChild(a);
    a.click();
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

// Функция для удаления файла
export const deleteFile = async (id: string) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};
