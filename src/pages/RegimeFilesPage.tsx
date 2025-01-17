// src/pages/RegimeFilesPage.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Spinner,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  ButtonGroup,
  Spacer,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  FormControl,
  Input,
  FormLabel,
  Flex,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import {
  getAllRegimeFiles,
  deleteFile,
  downloadFile,
  uploadFile,
} from "../api/regimeFileApi";
import { RegimeFileResponse } from "../types/regimeFile";
import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";

const RegimeFilesPage: React.FC = () => {
  const [files, setFiles] = useState<RegimeFileResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [timestamp, setTimestamp] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const fileList = await getAllRegimeFiles();
        setFiles(fileList);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteFile(id);
      setFiles(files.filter((file) => file.id !== id));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleDownload = async (id: string) => {
    try {
      await downloadFile(id);

    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("Пожалуйста, выберите файл для загрузки.");
      return;
    }

    if (!timestamp) {
      console.error("Пожалуйста, выберите время загрузки.");
      return;
    }

    const newFile = new File([file], fileName || file.name, {
      type: file.type,
    });

    const formData = new FormData();
    formData.append("File", newFile);
    formData.append("Timestamp", timestamp);

    try {
      await uploadFile(formData);
      console.log("Файл загружен");
      setFile(null);
      setTimestamp("");
      setFileName("");
      const fileList = await getAllRegimeFiles();
      setFiles(fileList);
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setTimestamp(
        new Date(selectedFile.lastModified).toISOString().slice(0, 16)
      );
    },
    multiple: false,
  });

  return (
    <VStack  p={4} spacing={4} align="stretch">
      <Heading as="h2" size="xl" mb={4}>
        Управление файлами
      </Heading>
      <Flex borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        <Tooltip label="Загрузить файл" placement="bottom">
          <Button
             onClick={handleOpenModal}
            variant="solid"
            aria-label="Add group"
            colorScheme="blue"
            borderRadius="md"
          >
            Загрузить файл
          </Button>
        </Tooltip>
      </Flex>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Загрузить файл</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              {...getRootProps()}
              border="2px dashed"
              borderColor="blue.500"
              borderRadius="md"
              p={6}
              textAlign="center"
              cursor="pointer"
              bg="gray.50"
              _hover={{
                backgroundColor: "blue.100",
              }}
            >
              <input {...getInputProps()} id="file-upload" type="file" hidden />
              <AiOutlineCloudUpload size={30} color="blue" />
              <Text fontSize="lg" color="blue.700" mt={2}>
                Загрузить файл
              </Text>
            </Box>
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
              colorScheme="blue"
              width="full"
              isDisabled={!file || !timestamp}
              mt={4}
            >
              Загрузить
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor="gray.700"
              textColor={"white"}
              onClick={handleCloseModal}
            >
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box>
        <Heading as="h3" size="lg" mb={4}>
          Список файлов
        </Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          <TableContainer>
            {files.length === 0 ? (
              <Text>В файловом хранилище нет доступных файлов.</Text>
            ) : (
              <Table>
                <Thead>
                  <Tr>
                    <Th>Название</Th>
                    <Th>Метка времени</Th>
                    <Th>Действия</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {files.map((file) => (
                    <Tr key={file.id}>
                      <Td>{file.name}</Td>
                      <Td>{new Date(file.timestamp).toLocaleString()}</Td>
                      <Td>
                        <ButtonGroup>
                          <Button
                            variant="outline"
                            aria-label="Open group"
                            borderColor="blue.500"
                            textColor={"blue.500"}
                            borderRadius="md"
                            size="sm"
                            onClick={() => handleDownload(file.id)}
                          >
                            Скачать
                          </Button>
                          <Spacer />
                          <Button
                            variant="outline"
                            aria-label="Open group"
                            borderColor="red.500"
                            textColor={"red.500"}
                            borderRadius="md"
                            size="sm"
                            onClick={() => handleDelete(file.id)}
                          >
                            Удалить
                          </Button>
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </TableContainer>
        )}
      </Box>
    </VStack>
  );
};

export default RegimeFilesPage;