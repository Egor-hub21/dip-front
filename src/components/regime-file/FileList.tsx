// src/components/FileList.tsx
import React from 'react';
import { Box, Button, Text, Stack } from '@chakra-ui/react';
import { RegimeFileResponse } from '../../types/regimeFile';
import { downloadFile, deleteFile } from '../../api/regimeFileApi';

interface FileListProps {
  files: RegimeFileResponse[];
  setFiles: React.Dispatch<React.SetStateAction<RegimeFileResponse[]>>;
}

const FileList: React.FC<FileListProps> = ({ files, setFiles }) => {
  const handleDownload = async (id: string) => {
    try {
      await downloadFile(id);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFile(id);
      setFiles(files.filter(file => file.id !== id)); // Удаление из локального состояния
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <Stack>
      {files.length === 0 ? (
        <Text>Нет доступных файлов для отображения.</Text>
      ) : (
        files.map((file) => (
          <Box key={file.id} p={4} borderWidth={1} borderRadius="lg">
            <Text fontWeight="bold">{file.name}</Text>
            <Text>{new Date(file.timestamp).toLocaleString()}</Text>
            <Button onClick={() => handleDownload(file.id)} colorScheme="blue" mr={4}>
              Скачать
            </Button>
            <Button onClick={() => handleDelete(file.id)} colorScheme="red">
              Удалить
            </Button>
          </Box>
        ))
      )}
    </Stack>
  );
  
};

export default FileList;
