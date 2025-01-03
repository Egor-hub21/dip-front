import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  VStack,
  DrawerBody,
  Icon
} from "@chakra-ui/react";
import { useSidenav } from "./sidenav-context/sidenav-context";
import SidenavItems, { SidenavItem } from "./sidenav-items/sidenav-items";
import { VscSymbolEvent } from "react-icons/vsc";
export interface SidenavProps {
  navItems: SidenavItem[];
}

export function Sidenav({ navItems }: SidenavProps) {
  const { isOpen, onClose } = useSidenav();
  return (
    <React.Fragment>
      <VStack spacing="5" as="nav" display={{ base: "none", md: "flex" }}>
        <Icon
          as={VscSymbolEvent}
          boxSize={8}
          bg="blue.500"
          color={"white"}
          border="2px"
          borderColor="blue.900"
          rounded="md"
        />{" "}
        {/*OR PUT YOUR LOGO HERE */}
        <SidenavItems navItems={navItems} />
      </VStack>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bgColor={"blue.500"} color={"white"}>
            Навигация
          </DrawerHeader>
          <DrawerBody>
            <SidenavItems navItems={navItems} mode="over" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </React.Fragment>
  );
}

export default Sidenav;
