import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Input,
  List,
  ListItem,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  Tooltip,
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
      <VStack p={4} spacing={4} align="stretch" width="50%" height="100%">
        <Heading as="h2" size="xl" mb={4}>
          Схемы
        </Heading>


        <Flex borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
          <Tooltip label="Добавить новую схему" placement="bottom">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="solid"
              aria-label="Add group"
              colorScheme="blue"
              borderRadius="md"
            >
              Добавить новую схему
            </Button>
          </Tooltip>
        </Flex>

        <Heading fontSize="2xl" mb={4}>
          Список схем
        </Heading>
        <List spacing={3}>
          {schemes.map((scheme) => (
            <ListItem key={scheme.id}>
              <Flex>
                <Button
                  onClick={() => handleSchemeSelect(scheme.id)}
                  variant="outline"
                  width="full"
                  _hover={{ backgroundColor: "blue.600" }}
                  color={selectedSchemeId === scheme.id ? "white" : "black"}
                  backgroundColor={
                    selectedSchemeId === scheme.id ? "blue.500" : "transparent"
                  }
                  fontWeight="medium"
                  justifyContent="flex-start"
                  fontSize="xl"
                  _active={{ backgroundColor: "blue.800" }}
                >
                  {scheme.name}
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
      <Box
        width="50%"
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
