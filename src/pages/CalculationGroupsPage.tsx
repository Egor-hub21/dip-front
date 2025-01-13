import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  Text,
  Heading,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link,
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Tooltip,
  Flex,
  ButtonGroup,
  useDisclosure,
  Select,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepIcon,
  StepIndicator,
  StepStatus,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
} from "@chakra-ui/react";
import {
  CalculationGroupRequest,
  CalculationGroupLightResponse,
} from "../types/CalculationGroups";
import { getAllSchemes, getSchemeById } from "../api/schemeDataApi"; // Import the method
import {
  createCalculationGroup,
  fetchCalculationGroups,
} from "../api/calculationGroupApi"; // Import the create function and fetch function
import {
  SchemeDataLightResponse,
  SchemeDataFullResponse,
  Section,
  RegulationUnit,
} from "../types/schemeData";
import { NavLink } from "react-router-dom";


const steps = [
  { title: "Описание", description: "" },
  { title: "Данные схемы", description: "" },
];

const CalculationGroupsPage: React.FC = () => {
  const [groups, setGroups] = useState<CalculationGroupLightResponse[]>([]);
  const [currentModelStep, setCurrentModelStep] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [schemeId, setSchemeId] = useState("");
  const [selectedRegulationUnits, setSelectedRegulationUnits] = useState<
    RegulationUnit[]
  >([]);
  const [availableSchemes, setAvailableSchemes] = useState<
    SchemeDataLightResponse[]
  >([]);
  const [selectedSchemeData, setSelectedSchemeData] =
    useState<SchemeDataFullResponse | null>(null); // State for full scheme data

  const { isOpen, onOpen, onClose } = useDisclosure();


  const availableSections: Section[] = selectedSchemeData
    ? selectedSchemeData.sections
    : []; // Sections based on selected scheme

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const schemes: SchemeDataLightResponse[] = await getAllSchemes();
        setAvailableSchemes(schemes);
      } catch (error) {
        console.error("Ошибка при загрузке схем:", error);
      }
    };

    const fetchGroups = async () => {
      try {
        const fetchedGroups: CalculationGroupLightResponse[] =
          await fetchCalculationGroups();
        setGroups(fetchedGroups); // Set the fetched groups
      } catch (error) {
        console.error("Ошибка при загрузке групп:", error);
      }
    };

    fetchSchemes();
    fetchGroups(); // Fetch groups when component mounts
  }, []);

  const handleSchemeChange = async (id: string) => {
    setSchemeId(id);
    setSelectedRegulationUnits([]); // Reset selected regulation units
    setSectionId(""); // Reset selected section

    if (id) {
      try {
        const schemeData: SchemeDataFullResponse = await getSchemeById(id);
        setSelectedSchemeData(schemeData); // Set the full scheme data
      } catch (error) {
        console.error("Ошибка при загрузке схемы:", error);
      }
    } else {
      setSelectedSchemeData(null); // Clear scheme data if no scheme is selected
    }
  };

  const addGroup = async () => {
    if (name.trim() && sectionId && selectedRegulationUnits.length > 0) {
      const newGroup: CalculationGroupRequest = {
        name,
        description,
        sectionId,
        regulationUnitIds: selectedRegulationUnits.map((unit) => unit.id) || [],
      };

      try {
        const createdGroupId: string = await createCalculationGroup(newGroup); // Call API to create group
        const newGroupWithId: CalculationGroupLightResponse = {
          id: createdGroupId,
          name,
          description,
        };
        setGroups([...groups, newGroupWithId]); // Update state with new group
        clearInputs();
      } catch (error) {
        console.error("Ошибка при добавлении группы:", error);
      }
    }
  };

  const clearInputs = () => {
    setName("");
    setDescription("");
    setSectionId("");
    setSelectedRegulationUnits([]);
    setCurrentModelStep(0); // Reset step
    setSelectedSchemeData(null); // Clear selected scheme data
  };

  const handleCheckboxChange = (unit: RegulationUnit) => {
    setSelectedRegulationUnits((prev) =>
      prev.includes(unit)
        ? prev.filter((u) => u.id !== unit.id)
        : [...prev, unit]
    );
  };

  const handleContinue = () => {
    if (currentModelStep < modalWindows.length - 1) {
      setCurrentModelStep(currentModelStep + 1);
    } else {
      addGroup();
    }
  };

  const modalWindows = [
    <Box key="0" maxHeight={"80vh"}>
      <FormControl>
        <FormLabel htmlFor="my-select" >Название</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="lg"
            placeholder="Введите название"
            mb={3}
          />
        <FormLabel htmlFor="my-select" >Описание</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание"
            size="lg"
            height="20vh"
            resize="none"
            overflow="auto" 
          />
      </FormControl>
    </Box>,
    <Box key="1" maxHeight={"10%"}>
      <FormControl>
      <FormLabel htmlFor="my-select">Выберите схему</FormLabel>
      <Select
        aria-labelledby="Выберите схему"
        value={schemeId}
        onChange={(e) => handleSchemeChange(e.target.value)}
        placeholder={availableSchemes.length > 0 ? "Выберите схему" : "Нет доступных схем"}
        mb={3}
      >
        {availableSchemes.map((scheme) => (
          <option key={scheme.id} value={scheme.id}>
            {scheme.name}
          </option>
        ))}
      </Select>
      <FormLabel htmlFor="my-select">Выберите сечение</FormLabel>
      <Select
        aria-labelledby="Выберите сечение"
        value={sectionId}
        onChange={(e) => setSectionId(e.target.value)}
        placeholder={availableSchemes.length > 0 ? "Выберите сечение" : "Нет доступных сечений"}
        mb={3}
      >
        {availableSections.map((section) => (
          <option key={section.id} value={section.id}>
            {section.name}
          </option>
        ))}
      </Select>
      </FormControl>
      <Text fontWeight="bold">Выберите регуляторные единицы:</Text>
      <VStack spacing={2} align="start">
        {selectedSchemeData?.regulationUnits.map((unit) => (
          <Checkbox
            key={unit.id}
            isChecked={selectedRegulationUnits.includes(unit)}
            onChange={() => handleCheckboxChange(unit)}
          >
            {unit.name}
          </Checkbox>
        ))}
      </VStack>
    </Box>,
  ];

  const handleNext = () => {
    if (currentModelStep < modalWindows.length - 1) {
      setCurrentModelStep(currentModelStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentModelStep > 0) {
      setCurrentModelStep(currentModelStep - 1);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h2" size="lg">
        Группы расчетов
      </Heading>
      <Flex borderWidth="1px" borderRadius="lg" overflow="hidden" mt={10} p={4}>
        <Tooltip label="Добавить группу" placement="bottom">
          <Button
            onClick={onOpen}
            variant="solid"
            aria-label="Add group"
            colorScheme="blue"
            borderRadius="md"
          >
            Добавить группу
          </Button>
        </Tooltip>
      </Flex>
      <TableContainer>
        <Table variant="simple" colorScheme="gray">
          <Thead>
            <Tr>
              <Th bg="gray.400" color="white">
                Название
              </Th>
              <Th bg="gray.400" color="white">
                Описание
              </Th>
              <Th bg="gray.400" color="white">
                Действия
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {groups.map((group) => (
              <Tr key={group.id}>
                <Td>{group.name}</Td>
                <Td>{group.description}</Td>
                <Td>
                  <Link as={NavLink} to={`/calculation-groups/${group.id}`}>
                    <Button
                      variant="outline"
                      aria-label="Open group"
                      borderColor="blue.500"
                      textColor={"blue.500"}
                      borderRadius="md"
                      size="xs"
                    >
                      Открыть
                    </Button>
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Модальное окно */}
      <Modal isOpen={isOpen} onClose={onClose} size="3xl" >
        <ModalOverlay />
        <ModalContent height = "80vh">
          <ModalHeader fontSize="2xl" fontWeight="bold">Добавить группу расчетов</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Stepper size="md" index={currentModelStep} mb={4}  p={4} >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
            {modalWindows.find((modal) => modal.key === currentModelStep.toString())}
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              <Button onClick={handlePrev} isDisabled={currentModelStep === 0}>
                Назад
              </Button>
              {
                currentModelStep < modalWindows.length-1 ? (
                  <Button onClick={handleNext}>Далее</Button>
                ) : (
                  <Button colorScheme="blue" onClick={() => {handleContinue(); onClose();}}>
                    Добавить
                  </Button>
                )
              }
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default CalculationGroupsPage;
