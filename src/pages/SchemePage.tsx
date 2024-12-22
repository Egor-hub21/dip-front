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
} from "@chakra-ui/react";
import { getAllSchemes, createScheme } from "../api/schemeDataApi";
import SchemeDetail from "../components/scheme-data/SchemeDetail";
import { SchemeDataLightResponse } from "../types/schemeData";

const SchemePage: React.FC = () => {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string | null>(null);
  const [newSchemeName, setNewSchemeName] = useState("");
  const [schemes, setSchemes] = useState<SchemeDataLightResponse[]>([]);

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
      setNewSchemeName("");
      // Refresh the list of schemes
      const data = await getAllSchemes();
      setSchemes(data);
    }
  };

  return (
    <Flex>
      <Box flex="1" p={4}>
        <Heading mb={4}>Schemes</Heading>
        <Input
          placeholder="New Scheme Name"
          value={newSchemeName}
          onChange={(e) => setNewSchemeName(e.target.value)}
          mb={4}
        />
        <Button onClick={handleAddScheme} colorScheme="teal" mb={4}>
          Add Scheme
        </Button>
        <Heading fontSize="2xl" mb={4}>
          Scheme list
        </Heading>
        <List spacing={3}>
          {schemes.map((scheme) => (
            <ListItem key={scheme.id}>
              <Button
                onClick={() => handleSchemeSelect(scheme.id)}
                variant="outline"
                width="full"
                _hover={{ backgroundColor: "teal.700" }}
                color="black" // Яркий белый текст
                fontWeight="medium" // Жирный шрифт
                justifyContent="flex-start" // Расположение текста и иконки
                fontSize="xl" // Увеличиваем размер текста
                _active={{ backgroundColor: "teal.800" }}
              >
                {scheme.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box flex="1.5" p={4}>
        {selectedSchemeId ? (
          <SchemeDetail schemeId={selectedSchemeId} />
        ) : (
          <Text>Please select a scheme.</Text>
        )}
      </Box>
    </Flex>
  );
};

export default SchemePage;
