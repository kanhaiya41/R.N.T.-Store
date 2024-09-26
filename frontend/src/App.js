import React from 'react'
import Home from './components/home'
import { Routes, Route } from 'react-router-dom'
import Mainmenu from './components/Mainmenu'
import ContactUs from './components/ContactUs'
import AboutUs from './components/AboutUs'
import { Toaster } from 'react-hot-toast';
import EditProfile from './components/EditProfile'
import Auth from './components/Auth'
import AuthfPass from './AuthfPass'

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/main-menu' element={<Mainmenu />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/profile' element={<EditProfile />} />
        <Route path='/email-auth' element={<Auth />} />
        <Route path='/password-authentication' element={<AuthfPass />} />

      </Routes>

    </>
  )
}

export default App
