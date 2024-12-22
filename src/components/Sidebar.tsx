// src/components/Sidebar.tsx
import React from 'react';
import { Box, VStack, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Box
      width="250px"
      bg="teal.500"
      color="white"
      height="100vh"
      p={4}
      display={{ base: 'none', md: 'block' }} // Скрыть меню на маленьких экранах
    >
      <VStack align="start" spacing={6}>
        <Text fontSize="2xl" fontWeight="bold">My App</Text>
        <Link as={RouterLink} to="/">
          <Text>Page 1</Text>
        </Link>
        <Link as={RouterLink} to="/page2">
          <Text>Page 2</Text>
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
