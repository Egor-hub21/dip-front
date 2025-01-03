// src/pages/Home.tsx
import React from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const Home: React.FC = () => {
  return (
    <Box
      p={8}
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      bg="gray.50"
    >
      <VStack spacing={6} align="center" justify="center">
        <Heading as="h1" size="2xl" color="blue.500">
          Добро пожаловать в наше приложение!
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Это ваш основной экран. Используйте меню для навигации по различным
          страницам приложения.
        </Text>
      </VStack>
    </Box>
  );
};

export default Home;
