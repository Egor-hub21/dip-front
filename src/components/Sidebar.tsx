// src/components/Sidebar.tsx
import React from 'react'
import { Box, VStack, HStack, IconButton, Text, useDisclosure, useBreakpointValue } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const { isOpen, onToggle } = useDisclosure()
  const isWideVersion = useBreakpointValue({ base: false, md: true })

  return (
    <HStack>
      <Box
        display={{ base: 'none', md: 'block' }}
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

      {/* Responsive Hamburger menu for small screens */}
      {!isWideVersion && (
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          onClick={onToggle}
          display={{ base: 'block', md: 'none' }}
          position="fixed"
          top={4}
          left={4}
          zIndex={1000}
        />
      )}

      {/* Mobile Drawer Menu */}
      {isOpen && !isWideVersion && (
        <Box
          position="fixed"
          top={0}
          left={0}
          w="200px"
          h="100vh"
          bg="teal.500"
          color="white"
          p={4}
          zIndex={1000}
          display={{ base: 'block', md: 'none' }}
        >
          <VStack align="start" spacing={6}>
            <Link to="/page1">
              <Text>Page 1</Text>
            </Link>
            <Link to="/page2">
              <Text>Page 2</Text>
            </Link>
          </VStack>
        </Box>
      )}
    </HStack>
  )
}

export default Sidebar
