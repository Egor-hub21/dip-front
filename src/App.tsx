// src/App.tsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Sidebar from './components/Sidebar'
import Page1 from './pages/Page1'
import Page2 from './pages/Page2'

const App = () => {
  return (
    <Router>
      <Sidebar />
      <Box
        ml={{ base: '200px', md: '250px' }} // отступ от бокового меню для всех экранов
        p={4}
        minHeight="100vh" // добавляем минимальную высоту для контента
        transition="margin-left 0.3s ease" // плавное изменение отступа
      >
        <Routes>
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </Box>
    </Router>
  )
}

export default App
