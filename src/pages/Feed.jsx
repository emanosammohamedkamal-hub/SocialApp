import React, { useContext, useEffect, useState } from 'react'
import { data } from 'react-router-dom'
import  axios  from 'axios';
import { authContext } from '../context/Authcontext';
import LoadingScreen from '../component/LoadingScreen';
import Post from '../component/Post';
import CreatePost from '../component/CreatePost';
import { useQuery } from '@tanstack/react-query';
 import { Spinner } from '@heroui/react';

export default function Feed() {
   const {token}=useContext(authContext)
 
  const{data:Posts=[],isLoading,refetch,isError,isFetching}= useQuery({
       queryKey:["posts"],
       queryFn:   ( )=>getposts(),
       select:(data)=>data.data.data.posts
       
       
    })
    function getposts(){
     return axios.get("https://route-posts.routemisr.com/posts",{
      headers:{
              AUTHORIZATION:`Bearer ${token}`

      }
       })
 

   }
    
    
   return <>
   {(isFetching&&!isLoading)&& <div className='flex justify-center fixed  pb-3.5 w-full '><Spinner/></div>}
  <CreatePost  getposts={refetch} />
  {isLoading?<LoadingScreen/>:  Posts.map(function(post){return <div className='  flex justify-center'> <Post post={post}  getposts={refetch} /></div> })}
    </>
  
}
