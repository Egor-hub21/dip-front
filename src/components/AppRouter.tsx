// src/components/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../pages/Layout';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import ErrorPage from '../pages/ErrorPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Страницы с боковым меню */}
        <Route path="/" element={<Layout showSidebar={true} />}>
          <Route index element={<Page1 />} />
          <Route path="page2" element={<Page2 />} />
        </Route>

        {/* Страница без бокового меню */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
