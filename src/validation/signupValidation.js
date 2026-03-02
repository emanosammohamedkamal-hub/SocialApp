import {  regexValidation } from '../assets/regex.js'
import { calculateAge } from '../helper/calculateAge.js'
//  export const signUpValidation={
//  name:{
                    
//  required:{value:true,message:"name is requried"},
// minLength:{value:3,message:"name must be at least 3 charcter"},
//  maxLength:{value:30,message:"name must at most 50character "}

                    
//  },
//  email:{
//   required:{value:true,message:"email is required"},
//   pattern:{value:regexValidation.emailValidation ,message:"email is invalid"} 
//  },
// password:{
//  required:{value:true,message:"password s required"},
//  pattern:{value:regexValidation.passwordValidation,message:"Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"}
// },
// repassword:function(watch){
//     return {
         
//      required:{value:true,message:"rePassword is required"},
//                   validate:(value)=>{return value==watch("password")||"repasswod and password must be same"}
//     }
    
// } ,
    
// dateOfBirth:{
// required:{value:true,message:"birthdate is required"},
//                   validate:(date)=>{return calculateAge(date)>=18||"age must be at least 18 yaers "}  
// },

// gender:{
//  required:{value:true,message:"gender is required"},
// validate:(value)=>value=="male"||value=="female"||" gender must be(female or male)" 
// }



// }
import * as zod  from "zod"



export const schema=zod.object({
  name:zod.string().nonempty("name is required").min(3,"name must be at least 3 charcter").max(30,"name must be at most 50"), 
  email:zod.string().nonempty("email is require").regex(regexValidation.emailValidation,"email is invalied"),
  password:zod.string().nonempty("password is required").regex(regexValidation.passwordValidation,"Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
   rePassword:zod.string().nonempty("rePasswod is required"),
  dateOfBirth:zod.string().nonempty("dateOfBirth is required").refine((date)=>{return calculateAge(date)>=18 },"age must be at least 18 years"),
  gender:zod.string().nonempty("gender is required").refine((value)=> {return value=="male"||value=="female" },"gender must be female or male")
 }).refine((data)=>{return data.password==data.rePassword},{message:"password and confirm password must be same",path:["rePassword"]})

 