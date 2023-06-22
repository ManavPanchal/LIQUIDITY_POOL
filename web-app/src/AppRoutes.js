import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './components/pages/Home';
import SwapUI from './components/pages/SwapUI';
import PoolsUI from './components/pages/Pools';
import TokensUI from './components/pages/Tokens'
import AddToPool from './components/pages/AddToPool';
import RemoveLiquidity from './components/pages/RemoveLiquidity';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/swap" element={<SwapUI />} />
      <Route path="/tokens" element={<TokensUI />} />
      <Route path="/pools" element={<PoolsUI />} />
      <Route path="/pools/addliquidity" element={<AddToPool />} />
      <Route path="/pools/removeliquidity" element={<RemoveLiquidity />} />
    </Routes>
  );
};

export default AppRoutes;
