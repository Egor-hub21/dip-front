// src/pages/FileManagementPage.tsx
import React, { useState, useEffect } from 'react';
import { Box, Heading, Spinner } from '@chakra-ui/react';
import UploadFile from '../components/regime-file/UploadFile'; // Импортируем компонент для загрузки
import FileList from '../components/regime-file/FileList'; // Импортируем компонент для списка файлов
import { getAllRegimeFiles } from '../api/regimeFileApi';
import { RegimeFileResponse } from '../types/regimeFile';

const FileManagementPage: React.FC = () => {
  const [files, setFiles] = useState<RegimeFileResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const fileList = await getAllRegimeFiles();
        setFiles(fileList);
      } catch (error) {
        console.error('Error fetching files:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <Box p={4}>
      <Heading as="h2" size="xl" mb={4}>
        Управление файлами
      </Heading>

      <UploadFile /> {/* Компонент для загрузки файла */}
      
      <Box mt={8}>
        <Heading as="h3" size="lg" mb={4}>
          Список файлов
        </Heading>

        {loading ? (
          <Spinner size="xl" />
        ) : (
          <FileList files={files} setFiles={setFiles} /> // Компонент для отображения списка файлов
        )}
      </Box>
    </Box>
  );
};

export default FileManagementPage;
