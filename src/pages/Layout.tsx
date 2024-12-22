// src/pages/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';

interface LayoutProps {
  showSidebar: boolean; // Флаг для отображения бокового меню
}

const Layout: React.FC<LayoutProps> = ({ showSidebar }) => {
  return (
    <Flex height="100vh">
      {showSidebar && <Sidebar />} {/* Показываем меню, если showSidebar = true */}
      <Box flex="1" p={4} overflowY="auto">
        <Outlet /> {/* Контент текущего маршрута */}
      </Box>
    </Flex>
  );
};

export default Layout;
