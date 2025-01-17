import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  VStack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  Flex,
  Tooltip,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  fetchCalculationGroupDetails,
  getCalculation,
  addCalculationToGroup,
  startCalculation,
  deleteCalculation,
} from "../api/calculationGroupApi";
import { CalculationGroupFullResponse } from "../types/CalculationGroups";
import { CalculationFullResponse } from "../types/Calculation";
import { CalculationRequest } from "../types/Calculation";
import { getAllRegimeFiles } from "../api/regimeFileApi";
import { RegimeFileResponse } from "../types/regimeFile";
import ActionButtonWithPopover from "../components/ui/ActionButtonWithPopover";

const CalculationGroupPage: React.FC = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState<CalculationGroupFullResponse | null>(null);
  const [calculations, setCalculations] = useState<CalculationFullResponse[]>(
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [calculationName, setCalculationName] = useState("");
  const [files, setFiles] = useState<RegimeFileResponse[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string>("");

  useEffect(() => {
    const fetchGroupDetails = async () => {
      if (groupId) {
        const data = await fetchCalculationGroupDetails(groupId);
        setGroup(data);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fileList = await getAllRegimeFiles();
        setFiles(fileList);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleCalculationClick = async (calculationId: string) => {
    const calculationData = await getCalculation(calculationId);
    setCalculations((prevCalculations) => {
      const existingCalculation = prevCalculations.find(
        (calculation) => calculation.id === calculationId
      );
      if (existingCalculation) {
        return prevCalculations;
      }
      return [...prevCalculations, calculationData];
    });
  };

  const [popoverOpenIndex, setPopoverOpenIndex] = useState<number | null>(null);

    const handleDelete = async (calcId: string) => {
      try {
        await deleteCalculation(calcId);
        setGroup({
          id: group!.id,
          name: group!.name,
          description: group!.description,
            calculations: group!.calculations.filter(item => item.id !== calcId)
          } as CalculationGroupFullResponse);
        setPopoverOpenIndex(null);
      } catch (error) {
        console.error("Ошибка при удалении группы:", error);
      }
    };


  const handleAddCalculation = async () => {
    if (calculationName && selectedFileId) {
      const newCalculation: CalculationRequest = {
        name: calculationName,
        regimeFileId: selectedFileId,
      };
      try {
        const calculationId = await addCalculationToGroup(
          groupId!,
          newCalculation
        );
        await startCalculation(calculationId);
        setIsOpen(false);
        setCalculationName("");
        setSelectedFileId("");
      } catch (error) {
        console.error("Ошибка добавления расчета:", error);
      }
    }
  };

  if (!group) {
    return <Text>Группа не найдена</Text>;
  }

  return (
    <VStack p={4} spacing={4} align="stretch">
      <Heading as="h2" size="xl" mb={4}>
        {group.name}
      </Heading>
      <Flex borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
        <Tooltip label="Добавить расчет" placement="bottom">
          <Button
            onClick={() => setIsOpen(true)}
            variant="solid"
            aria-label="Add group"
            colorScheme="blue"
            borderRadius="md"
          >
            Добавить расчет
          </Button>
        </Tooltip>
      </Flex>
      <Box>
        <Accordion allowMultiple mt={2}>
          {group.calculations.map((calculation, index) => (
            <AccordionItem key={calculation.id}>
              <Flex justify="space-between" align="center" p={2}>
                <Text display="inline">
                  {calculation.name} ({calculation.fileName})
                </Text>
                <ActionButtonWithPopover
                  buttonLabel="Удалить"
                  buttonVariant="outline"
                  buttonColor="red.500"
                  confirmationText="Вы уверены, что хотите удалить эту группу?"
                  confirmationHeader="Подтверждение"
                  confirmButtonText="Да"
                  cancelButtonText="Нет"
                  confirmButtonColorScheme="red"
                  cancelButtonColorScheme="gray"
                  buttonSize="xs"
                  onConfirm={() => handleDelete(calculation.id)}
                  isOpen={popoverOpenIndex === index}
                  onOpen={() => setPopoverOpenIndex(index)}
                  onClose={() => setPopoverOpenIndex(null)}
                />
              </Flex>
              <AccordionButton
                onClick={() => handleCalculationClick(calculation.id)}
              >
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                {calculations.find(
                  (calculationData) => calculationData.id === calculation.id
                ) ? (
                  <VStack spacing={4}>
                    <TableContainer width="100%">
                      <Table variant="striped" colorScheme="gray" width="100%">
                        <Thead>
                          <Tr>
                            <Th bg="gray.400" color="white">
                              СРН
                            </Th>
                            <Th bg="gray.400" color="white" isNumeric>
                              Первичный резерв, Мвар
                            </Th>
                            <Th bg="gray.400" color="white" isNumeric>
                              Вторичный резерв, Мвар
                            </Th>
                            <Th bg="gray.400" color="white" isNumeric>
                              Влияние, о.е
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {calculations
                            .find(
                              (calculationData) =>
                                calculationData.id === calculation.id
                            )
                            ?.results.map((result) => (
                              <Tr key={result.name}>
                                <Td>{result.name}</Td>
                                <Td isNumeric>
                                  {result.freeReserve.toFixed(2)}
                                </Td>
                                <Td isNumeric>
                                  {result.lockedReserve.toFixed(2)}
                                </Td>
                                <Td isNumeric>{result.influence.toFixed(2)}</Td>
                              </Tr>
                            ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </VStack>
                ) : (
                  <Text display="inline">НЕТ ДАННЫХ</Text>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>

      {/* Модальное окно */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить расчет</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel htmlFor="calculationName" fontSize="lg" fontWeight="bold">
                Название расчета
              </FormLabel>
              <Input
                value={calculationName}
                onChange={(e) => setCalculationName(e.target.value)}
                placeholder="Название расчета"
                mb={3}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="file" fontSize="lg" fontWeight="bold">
                Файл
              </FormLabel>
              <Select
                value={selectedFileId}
                onChange={(e) => setSelectedFileId(e.target.value)}
                placeholder="Выберите файл"
                mb={3}
              >
                {files.map((file) => (
                  <option key={file.id} value={file.id}>
                    {file.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddCalculation}>
              Добавить
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default CalculationGroupPage;
