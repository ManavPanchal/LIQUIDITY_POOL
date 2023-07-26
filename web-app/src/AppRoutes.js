import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

const Home = lazy(()=> import('./components/pages/Home'))
const SwapUI = lazy(()=> import('./components/pages/SwapUI'))
const PoolsUI = lazy(()=> import('./components/pages/Pools'))
const TokensUI  = lazy(()=> import('./components/pages/Tokens'))
const AddToPool = lazy(()=> import('./components/pages/AddToPool'))
const RemoveLiquidity = lazy(()=> import('./components/pages/RemoveLiquidity'))

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Suspense><Home /></Suspense>} />
      <Route path="/swap" element={<Suspense><SwapUI /></Suspense>} />
      <Route path="/tokens" element={<Suspense><TokensUI /></Suspense>} />
      <Route path="/pools" element={<Suspense><PoolsUI /></Suspense>} />
      <Route path="/pools/addliquidity" element={<Suspense><AddToPool /></Suspense>} />
      <Route path="/pools/removeliquidity" element={<Suspense><RemoveLiquidity /></Suspense>} />
    </Routes>
  );
};

export default AppRoutes;
