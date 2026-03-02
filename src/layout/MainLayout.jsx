import  Navbar from '../component/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div>
        <Navbar/>
         <Outlet/>
 

    </div>
  )
}
