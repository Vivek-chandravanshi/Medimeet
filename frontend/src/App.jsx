import React from 'react'
import './index.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import {ToastContainer, toast}  from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//had the figma file for this

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/doctors' element={<Doctors/>}></Route>
        <Route path='/doctors/:speciality' element={<Doctors/>}></Route> {/*dynamic route for speciality*/}
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/my-profile' element={<Myprofile/>}></Route>
        <Route path='/my-appointments' element={<MyAppointments/>}></Route>
        <Route path='/appointment/:docId' element={<Appointment/>}></Route>
      </Routes>

      <Footer/>
    </div>
  )
}

export default App