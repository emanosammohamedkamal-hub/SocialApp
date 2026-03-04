import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../context/Authcontext'
import { Button, Input, Spinner } from '@heroui/react'
import axios from 'axios'
import photo from'../assets/image.svg'

export default function Comment({post,comment, getposts, isload}) {
  const{user,token}=useContext(authContext)
    const [isediting,setisediting]=useState(false)
    const[editvalue,seteditvalue]=useState(comment.content)
        const[editimage,setedimage]=useState()
        const [imageshow,setImageshow]=useState(comment.image)

    const[load,setisload]=useState(false)

 async function deletecomment(CommentId) {
          setisload(true)
      const{data}=await axios.delete(`https://route-posts.routemisr.com/posts/${post._id}/comments/${CommentId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }

      })
      await getposts() 
        setisload(false)

       }


    async function editComment(){
      setisload(true)
      const formatdata=new FormData()
      formatdata.set("content",editvalue)
            formatdata.set("image",editimage)

       const{data}=await axios.put(`https://route-posts.routemisr.com/posts/${post._id}/comments/${comment._id}`,formatdata,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(data.data.comment.content)
     seteditvalue(data.data.comment.content);  

     await getposts()
       setisediting(false)
       setisload(false)
    } 

  function handleimage(e){
      if(e.target.files[0]){
      setedimage(e.target.files[0])
      const url= URL.createObjectURL(e.target.files[0])
      setImageshow(url) 
      }

    }
  console.log(comment)
    return<>
   
   
      
      
      <div className="media flex pb-4">
       <a className="mr-4" href="#">
        <img className="rounded-full max-w-none w-12 h-12" src= { comment.commentCreator.photo} />
      </a>

       <div className="media-body">
        <div>
          <a className="inline-block text-base font-bold mr-2" href="#"> {comment.commentCreator.name}</a>
          <span className="text-slate-500 dark:text-slate-300">25 minutes ago</span>
 
        </div>
        
       {isediting?
       <div>
         <div className='flex gap-3 justify-end'>
                <Button  isLoading={load} className='bg-primary' onPress={editComment}>edit</Button>
                <Button  className='bg-red-400' onPress={function(){setisediting(false) 
                  seteditvalue(comment.content)}}>cancel</Button>
               </div>

       <Input className='w-100' value={editvalue} onChange={function(e){seteditvalue(e.target.value)}}/>
         <label>
                 <div className='flex'>
                  <img src={photo} className='w-[20px]'/>
                 <h5>Photo</h5>
                </div>
                
              <input  onChange={function(e){ handleimage(e)}} className='hidden' type='file' accept='image/*'/>
                       <img src={imageshow} className='w-[150px]'/>

               
            </label>
                

       </div>


   
        
       
       :

       <div>
         <p>{comment.content}</p>
         
               <img src={comment?.image} className="w-[200px]"/>
        </div>

       
       }
        
        <div className="mt-2 flex items-center">
          <a className="inline-flex items-center py-2 mr-3" href="#">
            <span className="mr-2">
              <svg className="fill-rose-600 dark:fill-rose-400" style={{width: 22, height: 22}} viewBox="0 0 24 24">
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                </path>
              </svg>
            </span>
            <span className="text-base font-bold">12</span>
          </a>
          <button className="py-2 px-4 font-medium hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
            Repply
          </button>
          {user._id==comment.commentCreator._id||user._id==post.user_id? <Button   onPress={ function(){deletecomment(comment._id)
            setisload(true)
          }}className="py-2 px-4 font-medium rounded-lg bg-red-500">
            Delete
          </Button>:""}


          {user._id==comment.commentCreator._id&&<button onClick={ function(){ 
            setisediting(true)}}className="py-2 px-4 font-medium rounded-lg">
              edit
            </button>}
        </div>
         
      </div>
      

    </div>
      
  </> 
     
 
   
}
 