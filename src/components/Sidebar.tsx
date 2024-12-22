// src/components/Sidebar.tsx
import { Box, VStack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      w="250px"
      h="100vh"
      bg="teal.500"
      color="white"
      p={4}
      boxShadow="lg"
    >
      <VStack align="start" spacing={6}>
        <Text fontSize="2xl" fontWeight="bold">My App</Text>
        <Link to="/page1">
          <Text>Page 1</Text>
        </Link>
        <Link to="/page2">
          <Text>Page 2</Text>
        </Link>
      </VStack>
    </Box>
  )
}

export default Sidebar
