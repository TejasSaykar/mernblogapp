import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Topbar from './components/Topbar/Topbar'
import Home from './pages/Home/Home'
import Single from './pages/single/Single'
import Write from './pages/write/Write'
import Settings from './pages/settings/Settings'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { Routes, Route, Navigate } from 'react-router-dom'
import Post from './components/post/Post'
import { useAuth } from './context/AuthContext'

function App() {


  return (
    <>
      <Topbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/write' element={<IsUser><Write /></IsUser>} />
        <Route path='/settings' element={<IsUser><Settings /></IsUser>} />
        <Route path='/post/:postId' element={<IsUser><Single /></IsUser>} />
      </Routes>
    </>
  )
}

export function IsUser(props) {
  const [auth] = useAuth();
  if (auth.username) {
    return props.children;
  } else {
    return <Navigate to={'/'} />
  }
}


export default App
