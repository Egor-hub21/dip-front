import React from 'react';
import { Box, VStack, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AiOutlineHome, AiOutlineFileText, AiOutlineCloudUpload } from 'react-icons/ai'; // Импортируем иконки

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
        <Text fontSize="3xl" fontWeight="bold" color="white">Reserve</Text>

        {/* Кнопка для ссылки Home с иконкой */}
        <Button
          as={RouterLink}
          to="/"
          variant="ghost"
          colorScheme="whiteAlpha"
          width="full"
          _hover={{ backgroundColor: 'teal.700' }} // При наведении цвет меняется
          color="white" // Яркий белый текст
          fontWeight="bold" // Жирный шрифт
          leftIcon={<AiOutlineHome size={24} />} // Увеличиваем размер иконки
          justifyContent="flex-start" // Расположение текста и иконки
          fontSize="xl" // Увеличиваем размер текста
          _active={{ backgroundColor: 'teal.800' }} // Состояние при нажатии
        >
          Home
        </Button>

        {/* Кнопка для ссылки Schemes с иконкой */}
        <Button
          as={RouterLink}
          to="/schemes"
          variant="ghost"
          colorScheme="whiteAlpha"
          width="full"
          _hover={{ backgroundColor: 'teal.700' }}
          color="white" // Яркий белый текст
          fontWeight="bold" // Жирный шрифт
          leftIcon={<AiOutlineFileText size={24} />} // Увеличиваем размер иконки
          justifyContent="flex-start" // Расположение текста и иконки
          fontSize="xl" // Увеличиваем размер текста
          _active={{ backgroundColor: 'teal.800' }} // Состояние при нажатии
        >
          Schemes
        </Button>

        {/* Кнопка для ссылки Regime Files с иконкой */}
        <Button
          as={RouterLink}
          to="/files"
          variant="ghost"
          colorScheme="whiteAlpha"
          width="full"
          _hover={{ backgroundColor: 'teal.700' }}
          color="white" // Яркий белый текст
          fontWeight="bold" // Жирный шрифт
          leftIcon={<AiOutlineCloudUpload size={24} />} // Увеличиваем размер иконки
          justifyContent="flex-start" // Расположение текста и иконки
          fontSize="xl" // Увеличиваем размер текста
          _active={{ backgroundColor: 'teal.800' }} // Состояние при нажатии
        >
          Regime Files
        </Button>
      </VStack>
    </Box>
  );
};

export default Sidebar;
