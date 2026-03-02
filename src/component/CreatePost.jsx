import React, { useContext, useEffect, useState } from 'react'
import photo from'../assets/image.svg'
import close from'../assets/close-circle.svg'

import { Button, Chip, Textarea } from '@heroui/react'
import Post from './Post';
import axios from 'axios';
import { authContext } from '../context/Authcontext';
 
export default function CreatePost({getposts}) {
        const {token}=useContext(authContext)
      
     const[showform,setshowform]=useState(false)
          const[caption,setcaption]=useState("")
                    const[isloading,setisloading]=useState(false)

                    const[imagepreview,setimagepreview]=useState(null)
                    const[image,setimage]=useState("")


  function handleimagechange(e){
     if(e.target.files[0]){
        setimage(e.target.files[0])
    const urlImage= URL.createObjectURL(e.target.files[0])
    setimagepreview(urlImage)
    console.log(urlImage)
      }

    
  }
    function removeimage(){
        setimagepreview(null)
        setimage(null)
     }


     async function createPost (e) {
        setisloading(true)
         e.preventDefault()
        const formData=new FormData()
        if(caption){
                    formData.set("body",caption)

        }
        if(image){
        formData.set("image",image)

        }
          const {data}=await axios.post("https://route-posts.routemisr.com/posts",formData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
            
        })
        
        console.log(data)
       await getposts()
       setimage(null)
       setimagepreview(null)
       setshowform(false)
       setisloading(false)
      }
 
  return <>
          <div className='flex justify-center py-3'>
              {!showform?<button onClick={function(){setshowform(true)}} className='border-1.5 border-gray-300 w-150 py-2 flex justify-start px-2 font-light cursor-text'>What's on Your Mind</button>
:    <form  onSubmit={createPost} className='border-1.5 border-gray-500 p-3'>
<Textarea rows="3"className=' w-150 py-2'
value={caption}
onChange={function(e){setcaption(e.target.value)}}
       placeholder="What's on Your Mind"
       variant="underlined"
       
    />
    {imagepreview&& <div className='relative'>
        
        <img src={imagepreview} className="w-150 "/>
        <button className=' absolute  top-0  right-0 ' onClick={function(){ removeimage()}}>
              <img src={close} className='w-[20px] '/>
        </button>
        
        </div>}
           

           <div className='flex justify-between mt-3'>
            <label className='w-fit'>
                <input type='file' accept='image/' className='hidden'   onChange={handleimagechange} />
                <div className='flex'>
                <img src={photo} className='w-[30px]'/>
                 
                <p>photo</p>
                  </div>
             </label>


             <div className='flex gap-2 '>
                  <Button onPress={function(){setshowform(false)
                    setimage(null)
                    setimagepreview(null)
                    }}>
                    cancel
                </Button>
                <Button isLoading={isloading} type="submit"className='bg-primary'> 
                    post
                </Button>
             </div>

           </div>
         </form>
  }

 

          
         </div>


         
  </>
   
}
