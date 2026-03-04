import axios from 'axios'
import React, { useContext, useState } from 'react'
import photo from'../assets/image.svg'
import close from'../assets/close-circle.svg'
import { Button } from '@heroui/react'
import { authContext } from '../context/Authcontext'

export default function CreateComment({post,getposts}) {

    const[comment,setcommentvalue]=useState("")
    const [image,setImage]=useState(null)
          const{token}=useContext(authContext)
    
        const [imageshow,setImageshow]=useState(null)

         const [isloading,setisloading]=useState(false)
         console.log(comment)

    async function createfuncation() {
      setisloading(true)
      const formdata=new FormData()
      if(comment){
        formdata.set("content",comment)
      }
      if(image){
        formdata.set("image",image)
      }

      const {data} =await axios.post(`https://route-posts.routemisr.com/posts/${post._id}/comments`,formdata,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
           await getposts()
        setImage(null)
       setImageshow(null)
 
            setisloading(false)
            console.log(data)
 
       
    }

     function handleimage(e){
      if(e.target.files[0]){
      setImage(e.target.files[0])
      const url= URL.createObjectURL(e.target.files[0])
      setImageshow(url) 
      }

    }

    function  removeimage(){
      setImage(null)
      setImageshow(null)
    }

   return <>
   <div className="relative">
    <input value={comment}
    onChange={function(e){setcommentvalue(e.target.value)}}

      className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20" type="text" placeholder="Write a comment" />
    
   
    <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
      <label>
          <div className='flex'>
           <img src={photo} className='w-[20px]'/>
          <h5>Photo</h5>
         </div>
         
       <input  onChange={function(e){ handleimage(e)}} className='hidden' type='file' accept='image/*'/>
       
        
     </label>
       {
      imageshow?
       <div className='relative'>
              
              <img src={imageshow} className="w-[200px] "/>
              <button className=' absolute  top-0  left-[175px] ' onClick={function(){ removeimage()}}>
                    <img src={close} className='w-[20px] '/>
              </button>
              
              </div>
       
      
      :""
     }
     
      <Button onPress={ createfuncation} isLoading={isloading} variant='faded' className='min-w-0 h-7 min-h-0 ms-3' >
         <svg className="fill-blue-500 dark:fill-slate-50  " style={{width: 20, height: 20}} viewBox="0 0 24 24">
          <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
      </svg>
      </Button>
       

       
    </span>


    
  </div>

  </>
  
}


