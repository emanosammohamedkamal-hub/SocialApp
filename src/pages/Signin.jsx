import { addToast, Alert, Button, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { regexValidation } from '../assets/regex'
import axios from 'axios'
import { inputProps } from '../component/getInputProps'
import { schema } from '../validation/loginSchema'
import { authContext } from './../context/Authcontext';
  
 export default function Signin() {
    const[isloading,setisloading]=useState()
        const[error,seterror]=useState()
    const {settoken}=useContext(authContext)
   
          const{handleSubmit,register,formState:{errors}} =  useForm({
            resolver:zodResolver(schema),
            defaultValues:{
              email:"eman77@gmail.com",
              password:"Eman@123"
            }
          })

 async function signin(loginData){
  try{
    setisloading(true)
                seterror("")

      const {data}= await axios.post("https://route-posts.routemisr.com/users/signin",loginData)
         localStorage.setItem("token",data.data.token) 
         settoken(data.data.token)
            addToast({
              title: "Success",
              description: "Email is created",
              color:  "success",
            })
  }catch(error){
    if(error.response){
    seterror(error.response.data.error)
    }else{
      seterror(error.message)
    }

  }
  finally{
    setisloading(false)

  }
  }


  return <>
  
  <form onSubmit={handleSubmit(signin)}>
    <div className='grid gap-3'>
       <div className='grid gap-2  text-center'>
      <h1>Welcome</h1>
      <p>Sign in</p>
    </div>
    <Input   {...register("email")}      {...inputProps("Email","email",errors.email)}/>
    <Input {...register("password")}   {...inputProps("password","password",errors.password)}/>
    <Button isLoading={isloading} type='submit'>SignIN</Button>
            {error&&   <Alert className="bg-danger"  title={error} />}

    
    </div>
  </form>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  </>
  
}
