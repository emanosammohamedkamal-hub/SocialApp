import axios from 'axios'
import React, { useState } from 'react'
import photo from'../assets/image.svg'
import close from'../assets/close-circle.svg'
import { Button } from '@heroui/react'

export default function CreateComment({post,getposts}) {

   
  const [newComment,setnewComment]=useState("")
    // const [newCommentimage,setnewCommentimage]=useState(null)

  const [loading,isloading]=useState(false)
  // const[imageshow,setimageshow]=useState(null)
 

//  function handleimagecomment(e){
//     if(e.target.files[0]){
//         setnewCommentimage(e.target.files[0])
        
//     const imageUrl=URL.createObjectURL(e.target.files[0])
//      setimageshow(imageUrl)
//     } 
    
//  }
  async function createcomment(){
    const formdata=new FormData()
    if(newComment){
    formdata.set("content",newComment)

    }
    // if(newCommentimage){
    //            formdata.set("image",newCommentimage)

    // }
 
    const {data} =await axios.post(`https://route-posts.routemisr.com/posts/${post._id}/comments`,formdata,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
    })
     await getposts()
     setnewComment("")
     
 }

//  function removeimage(){
//     setimageshow(null)
//     setnewCommentimage(null)
//       document.getElementById("imageinput").value=null 

//   }
  return <>
   <div className="relative">
    <input  
    value={newComment}
    onChange={function(e){setnewComment(e.target.value)}}
    className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20" type="text" placeholder="Write a comment" />
     {/* {imageshow&&<div className='relative'>
             
             <img src={imageshow} className="w-[150px] "/>
             <button className=' absolute  top-0  left-[130px] ' onClick={function(){ removeimage()}}>
                   <img src={close} className='w-[20px] '/>
             </button>
             </div>} */}
    
    <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
    {/* <label>
        
        <input type='file' accept='image/' className='hidden' onChange={handleimagecomment} id="imageinput"/>
        <div className='flex'>
            <img src={photo} className='w-[20px]'/>
            <p>photo</p>
        </div>
      </label> */}
     
      <Button onPress={createcomment} variant='faded' className='min-w-0 h-7 min-h-0 ms-3' >
         <svg className="fill-blue-500 dark:fill-slate-50  " style={{width: 20, height: 20}} viewBox="0 0 24 24">
        <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
      </svg>
      </Button>

       
    </span>
  </div>

  </>
  
}
