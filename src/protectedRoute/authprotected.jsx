import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../context/Authcontext'

export default function Authprotected({children}) {
 const{token}=  useContext(authContext)
   const islogged=!!token
  return <>
  {islogged?<Navigate to={"/"}/>:children}
  
  
  </>
   
}
