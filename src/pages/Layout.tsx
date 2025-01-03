// src/pages/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidenav, SidenavContainer, SidenavItem, SidenavProvider } from '../components/ui/sidenav';
import { Navbar } from '../components/ui/navbar/navbar';
import { AiOutlineCloudUpload, AiOutlineFileText, AiOutlineHome ,AiFillCalculator} from 'react-icons/ai';
import { Box } from '@chakra-ui/react';


const Layout: React.FC = () => {
  const navItems: SidenavItem[] = [
    { icon: AiOutlineHome, label: "Главная", to: "" },
    { icon: AiOutlineFileText, label: "Данные схем", to: "schemes" },
    { icon: AiOutlineCloudUpload, label: "Файлы", to: "files" },
    { icon: AiFillCalculator, label: "Расчеты", to: "calculation-groups" },
  ];
  return (
    <SidenavProvider>
      <SidenavContainer sidenav={<Sidenav navItems={navItems} />}>
          <Box p={0} m={0} height="100%" width="100%">
            <Navbar />
            <Outlet />
          </Box >
      </SidenavContainer>
    </SidenavProvider>
  );
};

export default Layout;
