import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { authContext } from '../context/Authcontext'

export default function ProtectedRoute({children}) {
  const{token}=  useContext(authContext)
  console.log(children)
  const islogged=!!token
 return <>
{islogged?children:<Navigate to={"/signin"}/> }
   
  
  </>

   
}
