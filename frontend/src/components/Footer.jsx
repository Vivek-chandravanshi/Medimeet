import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>

        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/*left secton*/}
            <div>
                <img className='mb-5 w-40' src={assets.Medimeetlogo} alt=''/>
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita aperiam rem iure quae ea aliquam laudantium in adipisci beatae, ipsum placeat quas alias dolores quia eaque velit! Beatae nulla velit, atque nemo eligendi ipsum amet.</p>
            </div>

            {/*middle section*/}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>Contact us</li>
                    <li>About us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            {/*right section*/}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+12-8541-842</li>
                    <li>vi@admin.com</li>
                </ul>
            </div>
        </div>

        {/*copyright text*/}
        <div>
            <hr/>
            <p className='py-5 text-sm text-center'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
    </div>
  )
}

export default Footer