import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { authContext } from '../context/Authcontext'
import Post from '../component/Post'
import LoadingScreen from '../component/LoadingScreen'

export default function PostDetails() {
   const {id}=useParams()
     const{token}=useContext(authContext)
        const  [post,setpost]=useState(null)
     const  [comments,setcomments]=useState(null)

    console.log(comments)

  async function getPostDetails(){
     const {data}=await axios.get("https://route-posts.routemisr.com/posts/"+id,{
      headers:{
        AUTHORIZATION:`Bearer ${token}`
      }
     })
     setpost(data.data.post)
     }

     async function getAllComment(){
     const {data}=await axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`,{
      headers:{
        AUTHORIZATION:`Bearer ${token}`
      }
     })
      setcomments(data.data.comments)
      console.log(data.data.comments)
      }
      console.log(comments)

      
  useEffect( ()=>{
     handledetailsBage()
  },[])
 
  function handledetailsBage(){
 getPostDetails()
     getAllComment()
  }
  return <>
  {post?   <div className='  flex justify-center'>  {post&& <Post post={post} comment={comments} getposts={handledetailsBage}/>} </div>
:<LoadingScreen/>}
    </>
  }
