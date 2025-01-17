import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  ButtonGroup,
} from "@chakra-ui/react";
import { getAllSchemes, createScheme } from "../api/schemeDataApi";
import SchemeDetail from "../components/scheme-data/SchemeDetail";
import { SchemeDataLightResponse } from "../types/schemeData";

const SchemePage: React.FC = () => {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);
  const [newSchemeName, setNewSchemeName] = useState("");
  const [schemes, setSchemes] = useState<SchemeDataLightResponse[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSchemeSelect = (id: string) => {
    setSelectedSchemeId(id);
  };

  useEffect(() => {
    const fetchSchemes = async () => {
      const data = await getAllSchemes();
      setSchemes(data);
    };

    fetchSchemes();
  }, []);

  const handleAddScheme = async () => {
    if (newSchemeName) {
      await createScheme(newSchemeName);
      // schemes.push({
      //   id: response,
      //   name: newSchemeName,
      // } as SchemeDataLightResponse);
      setNewSchemeName("");

      const data = await getAllSchemes();
      setSchemes(data);
      setIsModalOpen(false); // Закрыть модальное окно после добавления схемы
    }
  };

  return (
    <Flex height="100%">
      <VStack p={4} spacing={4} align="stretch" width="30%" height="100%">
        <Heading as="h2" size="xl" mb={4}>
          Схемы
        </Heading>

        <Flex borderWidth="1px" borderRadius="lg" overflow="hidden" p={2}>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="solid"
            aria-label="Add group"
            colorScheme="blue"
            borderRadius="md"
          >
            Добавить новую схему
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Схема</Th>
                <Th>Действия</Th>
              </Tr>
            </Thead>
            <Tbody>
              {schemes.map((scheme) => (
                <Tr key={scheme.id}>
                  <Td>{scheme.name}</Td>
                  <Td>
                    <ButtonGroup display="flex">
                      <Button
                        variant="outline"
                        aria-label="Open group"
                        borderColor="blue.500"
                        textColor={"blue.500"}
                        borderRadius="md"
                        size="sm"
                        onClick={() => handleSchemeSelect(scheme.id)}
                      >
                        Открыть
                      </Button>
                      <Button
                        variant="outline"
                        aria-label="Open group"
                        borderColor="red.500"
                        textColor={"red.500"}
                        borderRadius="md"
                        size="sm"
                        onClick={() => handleSchemeSelect(scheme.id)}
                      >
                        Удалить
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
      <Box
        width="70%"
        height="100%"
        border="2px"
        borderColor="gray.300"
        borderRadius="md"
       p={4}
      >
        {selectedSchemeId ? (
          <SchemeDetail schemeId={selectedSchemeId} />
        ) : (
          <Flex
            width="100%"
            height="100%"
            align="center" // Центрирование по вертикали
            justify="center"
          >
            <Text fontSize="2xl" fontWeight="bold">
              Выберите схему.
            </Text>
          </Flex>
        )}
      </Box>

      {/* Модальное окно для добавления схемы */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить новую схему</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Название новой схемы"
              value={newSchemeName}
              onChange={(e) => setNewSchemeName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddScheme}>
              Добавить
            </Button>
            <Button onClick={() => setIsModalOpen(false)} ml={3}>
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default SchemePage;
