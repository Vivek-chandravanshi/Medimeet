import React from 'react'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext.jsx'
import { AppContext } from '../../context/AppContext.jsx'

const Dashboard = () => {
  const {dashData, aToken, cancelAppointment, getDashData} = useContext(AdminContext)
  const {slotDateFormat} = useContext(AppContext)

  useEffect(()=>{
    if(aToken) {
      getDashData()
    }
  }, [aToken])

  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400 '>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointment_icon} alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p  className='text-gray-400 '>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt='' />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
            <p  className='text-gray-400 '>Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 border mt-10 rounded-t'>
          <img src={assets.list_icon} alt='' />
          <p className='font-semibold'>Latest Booking</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {(dashData.latestAppointments).map((item, index) => (
            <div key={index} className='flex items-center gap-3 px-6 py-3 hover:bg-gray-100'>
              <img className='w-10 rounded-full' src={item.docData.image} alt='' />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-500'>{slotDateFormat(item.slotDate)}</p>
              </div>
              <div className='ml-auto'>
                {item.cancelled 
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <img onClick={()=> cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon}/>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard