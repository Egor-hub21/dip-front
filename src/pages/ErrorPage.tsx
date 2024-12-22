// src/pages/ErrorPage.tsx
import React from 'react'
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ErrorPage: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bg="gray.50"
      p={4}
    >
      <VStack spacing={6} textAlign="center" maxWidth="lg">
        <Heading as="h1" size="4xl" color="red.500">
          404
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Sorry, the page you are looking for does not exist.
        </Text>
        <Button
          as={Link}
          to="/"
          colorScheme="teal"
          size="lg"
          variant="solid"
          width="200px"
        >
          Go to Home
        </Button>
      </VStack>
    </Box>
  )
}

export default ErrorPage
