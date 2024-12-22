import React, { useEffect, useState } from "react";
import {
  getSchemeById,
  createSection,
  createRegulator,
  createRegulationUnit,
} from "../../api/schemeDataApi";
import {
  SchemeDataFullResponse,
  SectionRequest,
  RegulatorRequest,
  RegulationUnitRequest,
} from "../../types/schemeData";
import {
  Box,
  Button,
  Text,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  CardBody,
  CardHeader,
  Heading,
  Card,
  List,
  ListItem,
} from "@chakra-ui/react";

interface SchemeDetailProps {
  schemeId: string;
}

const SchemeDetail: React.FC<SchemeDetailProps> = ({ schemeId }) => {
  const [scheme, setScheme] = useState<SchemeDataFullResponse | null>(null);
  const [newSectionName, setNewSectionName] = useState("");
  const [newRegulatorName, setNewRegulatorName] = useState("");
  const [newSectionNumber, setNewSectionNumber] = useState<number | undefined>(
    undefined
  );
  const [newRegulatorNumber, setNewRegulatorNumber] = useState<
    number | undefined
  >(undefined);
  const [newRegulationUnitName, setNewRegulationUnitName] = useState("");

  useEffect(() => {
    const fetchScheme = async () => {
      if (schemeId) {
        const data = await getSchemeById(schemeId);
        setScheme(data);
      }
    };

    fetchScheme();
  }, [schemeId]);

  const handleAddSection = async () => {
    if (newSectionName) {
      const sectionRequest: SectionRequest = {
        name: newSectionName,
        number: newSectionNumber!,
      }; // Use user-provided number
      await createSection(schemeId!, sectionRequest); // Use non-null assertion
      setNewSectionName("");
      // Refresh the scheme data
      const data = await getSchemeById(schemeId!);
      setScheme(data);
    }
  };

  const handleAddRegulator = async () => {
    if (newRegulatorName && newRegulatorNumber !== undefined) {
      const regulatorRequest: RegulatorRequest = {
        name: newRegulatorName,
        number: newRegulatorNumber,
      };
      await createRegulator(schemeId!, regulatorRequest); // Use non-null assertion
      setNewRegulatorName("");
      setNewRegulatorNumber(undefined);
      // Refresh the scheme data
      const data = await getSchemeById(schemeId!);
      setScheme(data);
    }
  };

  const handleAddRegulationUnit = async () => {
    if (newRegulationUnitName) {
      const regulationUnitRequest: RegulationUnitRequest = {
        name: newRegulationUnitName,
      };
      await createRegulationUnit(schemeId!, regulationUnitRequest); // Use non-null assertion
      setNewRegulationUnitName("");
      // Refresh the scheme data
      const data = await getSchemeById(schemeId!);
      setScheme(data);
    }
  };

  return (
    <Box>
      {scheme && (
        <>
          <Heading fontSize="2xl" mb={4}>
            {scheme.name}
          </Heading>
          <Tabs isLazy size="md" variant="enclosed">
            <TabList>
              <Tab>Sections</Tab>
              <Tab>Regulators</Tab>
              <Tab>Regulation Units</Tab>
            </TabList>

            <TabPanels>
              {/* Sections Tab */}
              <TabPanel>
                <Input
                  placeholder="New Section Name"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Section Number"
                  value={newSectionNumber}
                  onChange={(e) => setNewSectionNumber(Number(e.target.value))}
                />
                <Button onClick={handleAddSection} colorScheme="teal">
                  Add Section
                </Button>
                <List spacing="5">
                  {scheme.sections.map((section) => (
                    <ListItem key={section.id}>
                      <Card key={section.id} variant={"filled"} size={"sm"}>
                        <CardHeader>
                          <Heading size="md"> {section.name}</Heading>
                        </CardHeader>
                        <CardBody>
                          <Text fontSize="lg">Number: {section.number}</Text>
                        </CardBody>
                      </Card>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>

              {/* Regulators Tab */}
              <TabPanel>
                <Input
                  placeholder="New Regulator Name"
                  value={newRegulatorName}
                  onChange={(e) => setNewRegulatorName(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Regulator Number"
                  value={newRegulatorNumber}
                  onChange={(e) =>
                    setNewRegulatorNumber(Number(e.target.value))
                  }
                />
                <Button onClick={handleAddRegulator} colorScheme="teal">
                  Add Regulator
                </Button>
                <List spacing="5">
                  {scheme.regulators.map((regulator) => (
                    <ListItem key={regulator.id}>
                      <Card key={regulator.id} variant={"filled"} size={"sm"}>
                        <CardHeader>
                          <Heading size="md"> {regulator.name}</Heading>
                        </CardHeader>
                        <CardBody>
                          <Text fontSize="lg">Number: {regulator.number}</Text>
                        </CardBody>
                      </Card>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>

              {/* Regulation Units Tab */}
              <TabPanel>
                <Input
                  placeholder="New Regulation Unit Name"
                  value={newRegulationUnitName}
                  onChange={(e) => setNewRegulationUnitName(e.target.value)}
                />
                <Button onClick={handleAddRegulationUnit} colorScheme="teal">
                  Add Regulation Unit
                </Button>
                <List spacing="5">
                  {scheme.regulationUnits.map((regulationUnit) => (
                    <ListItem key={regulationUnit.id}>
                      <Card
                        key={regulationUnit.id}
                        variant={"filled"}
                        size={"sm"}
                      >
                        <CardHeader>
                          <Heading size="md"> {regulationUnit.name}</Heading>
                        </CardHeader>
                        <CardBody>
                          {regulationUnit.regulators.map((regulator) => (
                            <Text key={regulator.id} fontSize="lg">
                              {regulator.name}
                            </Text>
                          ))}
                        </CardBody>
                      </Card>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </>
      )}
    </Box>
  );
};

export default SchemeDetail;
