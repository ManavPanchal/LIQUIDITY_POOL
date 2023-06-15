import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './components/pages/Home';
import SwapUI from './components/pages/SwapUI';
import PoolsUI from './components/pages/Pools';
import AddToPool from './components/pages/AddToPool';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/swap" element={<SwapUI />} />
      <Route path="/pools" element={<PoolsUI />} />
      <Route path="/pools/addliquidity" element={<AddToPool />} />
    </Routes>
  );
};

export default AppRoutes;
