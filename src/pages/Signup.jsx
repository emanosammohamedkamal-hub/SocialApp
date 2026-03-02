import { addToast, Alert, Button, Input, Select, SelectItem } from '@heroui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as zod  from "zod"
import  { zodResolver} from "@hookform/resolvers/zod"
 import { regexValidation } from '../assets/regex.js'
 import { schema } from '../validation/signupValidation.js';
import  axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { inputProps } from '../component/getInputProps.js'
    
export default function Signup() {
    const[isloading,setisloading]=useState()

       const[error,seterror]=useState()

    const navigate=useNavigate()


         const{handleSubmit,register,formState:{errors}}= useForm({
                resolver:  zodResolver(schema),
                defaultValues: {
      name: "Eman",
      email: "eman77@gmail.com",
      password: "Eman@123",
      rePassword: "Eman@123",
      dateOfBirth: "2002-09-25",
      gender: "female"
    }
            })

           async function signup(registerData){
              console.log(registerData) 

            setisloading(true)
            seterror("")
            try{
              const {data}= await axios.post("https://route-posts.routemisr.com/users/signup",registerData)

                 addToast({
              title: "Success",
              description: "Email is created",
              color:  "success",
            })
               navigate('/signin')
             }catch(error){
              if(error.response){
                    seterror(error.response.data.errors)

              }else{
                seterror(error.message)
              }
             }
            finally{
              setisloading(false)
            }

  
  
            }
  
  return <>
  
  <form  onSubmit={handleSubmit(signup)}>
      <div className='grid gap-3'>
        <div className='grid gap-2 text-center'>
          <h1 className='text-2xl'>Join us Today</h1>
            <p> create your account and start connecting</p>

        </div>

                  <Input   {...register("name")}  {...inputProps( "Full Name","text",errors.name)}  />

                 <Input {...register("email" )}  {...inputProps( "Email","email",errors.email)}  />

                 <Input   {...register("password" )}  {...inputProps( "Password","text",errors.password)}  />

                 <Input {...register("rePassword" )}  {...inputProps( " Confirm Password","password",errors.rePassword)}  />

                <Input {...register("dateOfBirth" )} {...inputProps( "Birth of date","date",errors.dateOfBirth)}  />

                 <Select {...register("gender" )} {...inputProps( "gender","",errors.gender)}>
                   <SelectItem key="male">Male</SelectItem>
             <SelectItem key="female">Female</SelectItem>
         
           
     </Select>



<Button isLoading ={isloading} type='submit' color="primary">Sign in</Button>
<p>already Have Account <Link to={"/signin"}>Signin</Link></p>
   
        {error&&   <Alert className="bg-danger"  title={error} />

}
       </div>


















  </form>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  </>

}
  