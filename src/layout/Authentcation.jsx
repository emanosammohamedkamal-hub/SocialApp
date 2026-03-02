import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Authentcation() {
  return (
    <div  className='min-h-screen   flex justify-center items-center'>

        <div className=' border-gray-500  w-100  border-2 px-4 py-3 rounded-3xl shadow-xl'>
            <Outlet/>
        </div>
          
    </div>
  )
}
