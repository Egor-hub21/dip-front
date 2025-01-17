import React, { useEffect, useState } from "react";
import {
  getSchemeById,
  createSection,
  createRegulator,
  createRegulationUnit,
  updateRegulators,
  getFreeRegulatorsBySchemeId,
  readSchemaFromFile,
} from "../../api/schemeDataApi";
import {
  SchemeDataFullResponse,
  SectionRequest,
  RegulatorRequest,
  RegulationUnitRequest,
  Regulator,
} from "../../types/schemeData";
import {
  Box,
  Button,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Checkbox,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
  Flex,
  Select,
  Text,
} from "@chakra-ui/react";
import { getAllRegimeFiles } from "../../api/regimeFileApi";
import { RegimeFileResponse } from "../../types/regimeFile";

interface SchemeDetailProps {
  schemeId: string;
}

const SchemeDetail: React.FC<SchemeDetailProps> = ({ schemeId }) => {
  const [scheme, setScheme] = useState<SchemeDataFullResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isRegulatorModalOpen, setIsRegulatorModalOpen] = useState(false);
  const [isRegulatorWithUnitModalOpen, setIsRegulatorWithUnitModalOpen] =
    useState(false);
  const [isRegulationUnitModalOpen, setIsRegulationUnitModalOpen] =
    useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [newRegulatorName, setNewRegulatorName] = useState("");
  const [newSectionNumber, setNewSectionNumber] = useState<number | undefined>(
    undefined
  );
  const [newRegulatorNumber, setNewRegulatorNumber] = useState<
    number | undefined
  >(undefined);
  const [newRegulationUnitName, setNewRegulationUnitName] = useState("");

  const [freeRegulators, setFreeRegulators] = useState<Regulator[]>([]);
  const [selectedRegulatorIds, setSelectedRegulatorIds] = useState<string[]>(
    []
  );
  const [selectedRegulationUnitId, setSelectedRegulationUnitId] = useState<
    string | null
  >(null);

  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);
  const [selectedFileId, setSelectedFileId] = useState<string>("");
  const [files, setFiles] = useState<RegimeFileResponse[]>([]);

const percent = `${(100/3)}%`

  useEffect(() => {
    const fetchScheme = async () => {
      setLoading(true);
      try {
        if (schemeId) {
          const data = await getSchemeById(schemeId);
          setScheme(data);
        }
      } catch (error) {
        console.error("Ошибка при загрузке схемы:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [schemeId]);

  const handleAddSection = async () => {
    if (newSectionName && newSectionNumber !== undefined) {
      const sectionRequest: SectionRequest = {
        name: newSectionName,
        number: newSectionNumber,
      };
      await createSection(schemeId!, sectionRequest);
      setNewSectionName("");
      setNewSectionNumber(undefined);
      const data = await getSchemeById(schemeId!);
      setScheme(data);
      setIsSectionModalOpen(false);
    }
  };

  const handleAddRegulator = async () => {
    if (newRegulatorName && newRegulatorNumber !== undefined) {
      const regulatorRequest: RegulatorRequest = {
        name: newRegulatorName,
        number: newRegulatorNumber,
      };
      await createRegulator(schemeId!, regulatorRequest);
      setNewRegulatorName("");
      setNewRegulatorNumber(undefined);
      const data = await getSchemeById(schemeId!);
      setScheme(data);
      setIsRegulatorModalOpen(false);
    }
  };

  const handleAddRegulationUnit = async () => {
    if (newRegulationUnitName) {
      const regulationUnitRequest: RegulationUnitRequest = {
        name: newRegulationUnitName,
      };
      await createRegulationUnit(schemeId!, regulationUnitRequest);
      setNewRegulationUnitName("");
      const data = await getSchemeById(schemeId!);
      setScheme(data);
      setIsRegulationUnitModalOpen(false);
    }
  };

  const openRegulatorWithUnitModal = async (regulationUnitId: string) => {
    setSelectedRegulationUnitId(regulationUnitId);
    const freeRegulatorsData = await getFreeRegulatorsBySchemeId(schemeId!);
    setFreeRegulators(freeRegulatorsData);
    setIsRegulatorWithUnitModalOpen(true);
  };

  const handleRegulatorSelection = (regulatorId: string) => {
    setSelectedRegulatorIds((prev) =>
      prev.includes(regulatorId)
        ? prev.filter((id) => id !== regulatorId)
        : [...prev, regulatorId]
    );
  };

  const handleAddSelectedRegulators = async () => {
    if (selectedRegulationUnitId) {
      await updateRegulators(selectedRegulationUnitId, selectedRegulatorIds);
      setIsRegulatorWithUnitModalOpen(false);
      setSelectedRegulatorIds([]);
      // Refresh the scheme data after adding regulators
      const data = await getSchemeById(schemeId!);
      setScheme(data);
    }
  };

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

      const readFile = async () => {
        if (schemeId && selectedFileId) {
          try {
           await readSchemaFromFile(
              schemeId,
              selectedFileId
            );
            setIsFilesModalOpen(false);
            setSelectedFileId("");
          } catch (error) {
            console.error("Ошибка :", error);
          }
        }
      };

  return (
    <Box >
      {loading ? (
        <Flex
          align="center" // Центрирование по вертикали
          justify="center" // Центрирование по горизонтали
          height="100vh" // Высота на весь экран
        >
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Box maxHeight={"100vh"} >
          {scheme ? (
            <Box maxHeight={"100vh"} overflowY="auto">
              <Heading fontSize="2xl" mb={4}>
                {scheme.name}
              </Heading>
              <Flex borderWidth="1px" borderRadius="lg" overflow="hidden" p={2} mb={4}>
              <Button
                onClick={() => setIsFilesModalOpen(true)}
                variant="solid"
                aria-label="Add group"
                colorScheme="blue"
                borderRadius="md"
              >
                Считать данные из файла
              </Button>
              </Flex>
              <Tabs isLazy size="md" variant="enclosed">
                <TabList>
                  <Tab>Сечения</Tab>
                  <Tab>Регуляторы</Tab>
                  <Tab>Регулирующие единицы</Tab>
                </TabList>

                <TabPanels>
                  {/* Sections Tab */}
                  <TabPanel>
                    <Button
                      onClick={() => setIsSectionModalOpen(true)}
                      colorScheme="blue"
                      mb={4}
                    >
                      Добавить
                    </Button>
                    {scheme.sections.length === 0 ? (
                              <Flex
                              align="center" // Центрирование по вертикали
                              justify="center" // Центрирование по горизонтали
                              height="100%" // Высота на весь экран
                            >
                              <Text fontSize="xl">Сечения не заданы</Text>
                            </Flex>
                    ) :(

                    <TableContainer maxH="100ch" overflowY="auto">
                      <Table variant="simple" colorScheme={"gray.400"}>
                        <Thead position="sticky" top="0" bg="white" zIndex="1">
                          <Tr>
                            <Th
                              width="10%"
                              bg={"gray.500"}
                              textColor={"white"}
                              textAlign="left"
                              border={"1px solid"}
                            >
                              Номер
                            </Th>
                            <Th
                              width="90%"
                              bg={"gray.500"}
                              textColor={"white"}
                              textAlign="left"
                              border={"1px solid"}
                            >
                              Название
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {scheme.sections.map((section) => (
                            <Tr key={section.id}>
                              <Td textAlign="left">{section.number}</Td>
                              <Td
                                textAlign="left"
                                style={{ whiteSpace: "normal" }}
                              >
                                {section.name}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                    )}
                  </TabPanel>

                  {/* Regulators Tab */}
                  <TabPanel>
                    <Button
                      onClick={() => setIsRegulatorModalOpen(true)}
                      colorScheme="blue"
                      mb={4}
                    >
                      Добавить
                    </Button>
                    {scheme.sections.length === 0 ? (
                              <Flex
                              align="center" // Центрирование по вертикали
                              justify="center" // Центрирование по горизонтали
                              height="100%" // Высота на весь экран
                            >
                              <Text fontSize="xl">Регуляторы не заданы</Text>
                            </Flex>
                    ) :(
                    <TableContainer maxH="90ch" overflowY="auto">
                      <Table variant="simple" colorScheme={"gray.400"}>
                        <Thead position="sticky" top="0" bg="white" zIndex="1">
                          <Tr>
                            <Th
                              width="10%"
                              bg={"gray.500"}
                              textColor={"white"}
                              textAlign="left"
                              border={"1px solid"}
                            >
                              Номер
                            </Th>
                            <Th
                              width="90%"
                              bg={"gray.500"}
                              textColor={"white"}
                              textAlign="left"
                              border={"1px solid"}
                            >
                              Название
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {scheme.regulators.map((regulator) => (
                            <Tr key={regulator.id}>
                              <Td textAlign="left">{regulator.number}</Td>
                              <Td
                                textAlign="left"
                                style={{ whiteSpace: "normal" }}
                              >
                                {regulator.name}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                    )}
                  </TabPanel>

                  {/* Regulation Units Tab */}
                  <TabPanel>
                    <Button
                      onClick={() => setIsRegulationUnitModalOpen(true)}
                      colorScheme="blue"
                      mb={4}
                    >
                      Добавить
                    </Button>
                    {scheme.sections.length === 0 ? (
                              <Flex
                              align="center" // Центрирование по вертикали
                              justify="center" // Центрирование по горизонтали
                              height="100%" // Высота на весь экран
                            >
                              <Text fontSize="xl">Регулирующие единицы не заданы</Text>
                            </Flex>
                    ) :(
                    <TableContainer maxH="90ch" overflowY="auto">
                      <Table variant="simple" colorScheme={"gray.400"}>
                        <Thead position="sticky" top="0" bg="white" zIndex="1">
                          <Tr>
                            <Th
                              textAlign="left"
                              width={percent}
                              bg={"gray.500"}
                              textColor={"white"}
                              rowSpan={2}
                              border={"1px solid"}
                            >
                              Название
                            </Th>
                            <Th
                              textAlign="left"
                              width={percent}
                              bg={"gray.500"}
                              textColor={"white"}
                              colSpan={2}
                              border={"1px solid"}
                            >
                              Регуляторы
                            </Th>
                            <Th
                              width={percent}
                              bg={"gray.500"}
                              textColor={"white"}
                              textAlign="left"
                              rowSpan={2}
                              border={"1px solid"}
                            >
                              Действия
                            </Th>
                          </Tr>
                          <Tr>
                            <Th
                              textAlign="left"
                              width="10%"
                              bg={"gray.500"}
                              textColor={"white"}
                              border={"1px solid"}
                            >
                              Номер
                            </Th>
                            <Th
                              textAlign="left"
                              width="90%"
                              bg={"gray.500"}
                              textColor={"white"}
                              border={"1px solid"}
                            >
                              Название
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {scheme.regulationUnits.map((unit) => {
                            const { name, regulators } = unit;
                            return regulators.length > 0 ? (
                              regulators.map((regulator, index) => (
                                <Tr key={regulator.id}>
                                  {index === 0 && (
                                    <Td rowSpan={regulators.length}>{name}</Td>
                                  )}
                                  <Td>{regulator.number}</Td>
                                  <Td>{regulator.name}</Td>
                                  {index === 0 && (
                                    <Td rowSpan={regulators.length}>
                                      {" "}
                                      <Button
                                        onClick={() =>
                                          openRegulatorWithUnitModal(unit.id)
                                        }
                                        variant="outline"
                                        aria-label="Open group"
                                        borderColor="blue.500"
                                        textColor={"blue.500"}
                                        borderRadius="md"
                                        size="sm"
                                        style={{ whiteSpace: "normal" }}
                                      >
                                        Добавить регуляторы
                                      </Button>
                                    </Td>
                                  )}
                                </Tr>
                              ))
                            ) : (
                              <Tr key={unit.id}>
                                <Td>{name}</Td>
                                <Td colSpan={2}>No Regulators</Td>
                                <Td>
                                  <Button
                                    onClick={() =>
                                      openRegulatorWithUnitModal(unit.id)
                                    }
                                    variant="outline"
                                    aria-label="Open group"
                                    borderColor="blue.500"
                                    textColor={"blue.500"}
                                    borderRadius="md"
                                    size="sm"
                                    style={{ whiteSpace: "normal" }}
                                  >
                                    Добавить регуляторы
                                  </Button>
                                </Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          ) : (
            <Spinner />
          )}
        </Box>
      )}
      {/* Modal for adding a section */}
      <Modal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить секцию</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Название сечения"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Номер сечения"
              value={newSectionNumber}
              onChange={(e) => setNewSectionNumber(Number(e.target.value))}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddSection}>
              Добавить
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsSectionModalOpen(false)}
            >
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for adding a regulator */}
      <Modal
        isOpen={isRegulatorModalOpen}
        onClose={() => setIsRegulatorModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить регулятор</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Название регулятора"
              value={newRegulatorName}
              onChange={(e) => setNewRegulatorName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Номер регулятора"
              value={newRegulatorNumber}
              onChange={(e) => setNewRegulatorNumber(Number(e.target.value))}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddRegulator}>
              Добавить
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsRegulatorModalOpen(false)}
            >
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for adding a regulation unit */}
      <Modal
        isOpen={isRegulationUnitModalOpen}
        onClose={() => setIsRegulationUnitModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Добавить регулирующую единицу</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Название регулирующей единицы"
              value={newRegulationUnitName}
              onChange={(e) => setNewRegulationUnitName(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddRegulationUnit}>
              Добавить
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsRegulationUnitModalOpen(false)}
            >
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for selecting regulators for a regulation unit */}
      <Modal
        isOpen={isRegulatorWithUnitModalOpen}
        onClose={() => setIsRegulatorWithUnitModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Выберите регуляторы для регулирующей единицы
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {freeRegulators.map((regulator) => (
              
              <Checkbox
                key={regulator.id}
                isChecked={selectedRegulatorIds.includes(regulator.id)}
                onChange={() => handleRegulatorSelection(regulator.id)}
              >
                {regulator.name}
              </Checkbox>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddSelectedRegulators}>
              Добавить
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsRegulatorWithUnitModalOpen(false)}
            >
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal read scheme from file*/}
      <Modal
        isOpen={isFilesModalOpen}
        onClose={() => setIsFilesModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Считать данные схемы из файла</ModalHeader>
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() =>{readFile(); setIsFilesModalOpen(false)}}>
              Добавить
            </Button>
            <Button variant="ghost" onClick={() => setIsFilesModalOpen(false)}>
              Отмена
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SchemeDetail;
