import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Chat from './Pages/Chat'
import ForgotPassword from './Pages/ForgotPassword'
import CreateNewPassword from './Pages/CreateNewPassword'
import Homepage from './Pages/Homepage'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/login/forgot_password' element={<ForgotPassword />}/>
        <Route path='/reset_password/:token' element={<CreateNewPassword />}/>
        <Route path='/:id' element={<Chat />}/>
      </Routes>
  )
}

export default App