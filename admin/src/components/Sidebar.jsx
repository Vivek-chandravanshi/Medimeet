import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import {NavLink} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)
  return (
    <div className='min-h-screen bg-white border-r'>
        {
            aToken && <ul className=' text-[#515151] mt-5'>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-r-primary' : ''}`} to={'/admin-dashboard'}>
                    <img src={assets.home_icon}/>
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-r-primary' : ''}`} to={'/all-appointments'}>
                    <img src={assets.appointment_icon}/>
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-r-primary' : ''}`} to={'/add-doctor'}>
                    <img src={assets.add_icon}/>
                    <p className='hidden md:block'>Add Doctor</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-r-primary' : ''}`} to={'/doctor-list'}>
                    <img src={assets.people_icon}/>
                    <p className='hidden md:block'>Doctors List</p>
                </NavLink>
            </ul>
        }

        {
            dToken && <ul className=' text-[#515151] mt-5'>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-r-primary' : ''}`} to={'/doctor-dashboard'}>
                    <img src={assets.home_icon}/>
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-r-primary' : ''}`} to={'/doctor-appointments'}>
                    <img src={assets.appointment_icon}/>
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>
                <NavLink className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#f2f3ff] border-r-4 border-r-primary' : ''}`} to={'/doctor-profile'}>
                    <img src={assets.people_icon}/>
                    <p className='hidden md:block'>Profile</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}

export default Sidebar