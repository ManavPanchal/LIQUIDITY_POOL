import React from 'react'
import { Route, Router } from 'react-router'
import Home from './components/Home'

const routes = () => {
  return (
    <div>
      <Router>
        <Route path='/' element={<Home/>}/>
      </Router>
    </div>
  )
}

export default routes
