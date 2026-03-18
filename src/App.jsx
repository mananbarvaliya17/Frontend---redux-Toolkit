import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Collection from './pages/Collection'
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar'

const App = () => {
  return (
    <div className='min-h-screen w-full p-lg container-fluid'>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/collection' element={<Collection />} />
      </Routes>
      <ToastContainer />

    </div>
  )
}

export default App