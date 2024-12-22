import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, useToast, Text } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone'; // Импортируем useDropzone для drag-and-drop
import { uploadFile } from '../../api/regimeFileApi';
import { AiOutlineCloudUpload } from 'react-icons/ai'; // Иконка загрузки

const UploadFile: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [timestamp, setTimestamp] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const toast = useToast();

  // Использование react-dropzone для перетаскивания файлов
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setFileName(selectedFile.name); // Устанавливаем имя файла из загруженного файла
      setTimestamp(new Date(selectedFile.lastModified).toISOString().slice(0, 16));
    },
    multiple: false,
  });

  // Обработчик загрузки файла
  const handleUpload = async () => {
    if (!file) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите файл для загрузки.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!timestamp) {
      toast({
        title: 'Ошибка',
        description: 'Пожалуйста, выберите время загрузки.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Создаем новый объект File с именем из поля ввода
    const newFile = new File([file], fileName || file.name, { type: file.type });

    const formData = new FormData();
    formData.append('File', newFile); // Используем новый файл с заданным именем
    formData.append('Timestamp', timestamp);

    try {
      const response = await uploadFile(formData);
      toast({
        title: 'Файл загружен',
        description: `Файл загружен по пути: ${response.FilePath}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFile(null);
      setTimestamp('');
      setFileName('');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: `Не удалось загрузить файл. ${error}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} maxWidth="600px" mx="auto">
      <FormControl mb={4}>
        <FormLabel htmlFor="file-upload" fontSize="lg" fontWeight="bold">
          Выберите файл
        </FormLabel>

        {/* Область для drag-and-drop */}
        <Box
          {...getRootProps()}
          border="2px dashed"
          borderColor="teal.500"
          borderRadius="md"
          p={6}
          textAlign="center"
          cursor="pointer"
          bg="teal.50"
          _hover={{
            backgroundColor: 'teal.100',
          }}
        >
          <input {...getInputProps()} id="file-upload" type="file" hidden />
          <AiOutlineCloudUpload size={30} color="teal" />
          <Text fontSize="lg" color="teal.700" mt={2}>
            Перетащите файл сюда или выберите его
          </Text>
        </Box>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel htmlFor="file-name" fontSize="lg" fontWeight="bold">
          Название файла
        </FormLabel>
        <Input
          id="file-name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          size="sm"
          isDisabled={!file}
        />
      </FormControl>

      <FormControl mb={4}>
      <FormLabel htmlFor="timestamp" fontSize="lg" fontWeight="bold">
        Метка времени
      </FormLabel>
      <Input
        id="timestamp"
        type="datetime-local"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        isDisabled={!file}
      />
    </FormControl>

    <Button
      onClick={handleUpload}
      colorScheme="teal"
      width="full"
      isDisabled={!file || !timestamp}
      mt={4}
    >
      Загрузить
    </Button>
  </Box>
);
};

export default UploadFile;
