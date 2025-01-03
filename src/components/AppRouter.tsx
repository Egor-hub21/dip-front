// src/components/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../pages/Layout';
import RegimeFilesPage from '../pages/RegimeFilesPage';

import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import SchemePage from '../pages/SchemePage';
import CalculationGroupsPage from '../pages/CalculationGroupsPage';
import CalculationGroupPage from '../pages/CalculationGroupPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Страницы с боковым меню */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Главная страница */}
          <Route path="files" element={<RegimeFilesPage />} />
          <Route path="schemes" element={<SchemePage />} />
          <Route path="calculation-groups" element={<CalculationGroupsPage />} />
          <Route path="calculation-groups/:groupId" element={<CalculationGroupPage />} />
        </Route>

        {/* Страница без бокового меню */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
