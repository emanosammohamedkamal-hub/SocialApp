import axios from "axios";
import { createContext, useEffect } from "react";


import React from 'react'
import { useState } from 'react';



export const authContext=createContext(0)
  
export default function Authcontext({children}) {
   const [token,settoken]= useState(localStorage.getItem("token"))
   const [user,setuser]= useState(null)

  async function getLoggedUserData() {
    const {data}=await axios.get("https://route-posts.routemisr.com/users/profile-data",{
      headers:{
        Authorization:`Bearer ${token} `
      }
    })
    setuser(data.data.user)
    
  }
  useEffect(()=>{

    if(token!=null){
          getLoggedUserData()
    }
     
   },[token])
   return <>
  
  <authContext.Provider value={{token,settoken,user,setuser}}>

    {children}

  </authContext.Provider>
  </>
   
}
