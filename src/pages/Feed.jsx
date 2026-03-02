import React, { useContext, useEffect, useState } from 'react'
import { data } from 'react-router-dom'
import  axios  from 'axios';
import { authContext } from '../context/Authcontext';
import LoadingScreen from '../component/LoadingScreen';
import Post from '../component/Post';
import CreatePost from '../component/CreatePost';

export default function Feed() {
   const {token}=useContext(authContext)
   const [posts,setposts]=useState(null)
    async function getposts(){
     const {data}=await axios.get("https://route-posts.routemisr.com/posts",{
      headers:{
              AUTHORIZATION:`Bearer ${token}`

      }
       })
            setposts(data.data.posts)


   }
    
    
   useEffect(function(){getposts()},[])
  return <>
  <CreatePost  getposts={getposts} />
  {posts? posts.map(function(post){return <div className='  flex justify-center'> <Post post={post}  getposts={getposts} /></div> }):<LoadingScreen/>}
  </>
  
}
