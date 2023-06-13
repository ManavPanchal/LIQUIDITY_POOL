import React from 'react'
import { Route, Routes } from 'react-router'
import Home from './components/Home'
import SwapUI from './components/UI-components/SwapUI'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/swap' element={<SwapUI/>}/>
    </Routes>
  )
}

export default AppRoutes
