import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './components/pages/Home';
import SwapUI from './components/pages/SwapUI';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/swap" element={<SwapUI />} />
    </Routes>
  );
};

export default AppRoutes;
