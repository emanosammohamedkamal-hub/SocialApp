import React, { useContext, useState } from 'react'
import  avatar from '../assets/avatar-portrait-of-a-young-caucasian-boy-man-in-round-blue-frame-illustration-in-cartoon-flat-style-vector.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Comment from './Comment'
import CreateComment from './CreateComment'
import { authContext } from '../context/Authcontext'
import { Button } from '@heroui/react'
import axios from 'axios'

export default function Post({post,comment,getposts}) {
 console.log(comment)
      const{user}=useContext(authContext)
      const [posts,setposts]=useState(null)
        const[loading,setisloading]=useState(false)
           const {token}=useContext(authContext)
        

           const navigaet=useNavigate()

       async function deletePost(){
      setisloading(true)
      const{data}=await axios.delete(`https://route-posts.routemisr.com/posts/${post._id}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }) 
       if(comment){
        navigaet("/")

      }else{
       await  getposts()

      }
             setisloading(false)

       }

       async function deletecomment(CommentId) {
          setisloading(true)
      const{data}=await axios.delete(`https://route-posts.routemisr.com/posts/${post._id}/comments/${CommentId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }

      })
      await getposts() 
        setisloading(false)

       }



        return <>
  {post.body!=null||post.image!=null?  <article className="mb-4 break-inside p-6 rounded-xl bg-white dark:bg-slate-800 flex flex-col bg-clip-border sm:w-3/6 w-full">
       {/* user information */}

  <div className="flex pb-6 items-center justify-between">
  
     <div className="flex">
      <a className="inline-block mr-4" href="#">
        <img className="rounded-full max-w-none w-12 h-12" src= {post.user.photo} onError={(e)=>{e.target.src=avatar}} />
      </a>
      <div className="flex flex-col">
        <div>
          <a className="inline-block text-lg font-bold dark:text-white" href="#"> {post.user.name}</a>
        </div>
        <div className="text-slate-500 dark:text-slate-300 dark:text-slate-400">
          July 17, 2018
        </div>
      </div>
    </div>


  </div>

{/*  post  caption */}
  {post.body!=undefined? <h2 className="text-3xl font-extrabold dark:text-white">
     {post.body}
  </h2>:""}

{/*  post  image */}

  <div className="py-4">
    {post.user._id==user._id&& <Button isLoading={loading} className='bg-red-500 flex ms-auto p-3 rounded-xl mb-2 ' onPress={deletePost}>Delete</Button>
}
     <div className="flex justify-between gap-1 mb-1 bg-amber-500">
         {post.image&& <img className="  w-[100%] h-100 object-cover rounded-tl-lg" src={post.image} />
}
       
       
    </div>
    
  </div>


          {/* likes icon */}

  <div className="py-4">
         {/* likes icon */}
    <div className='flex justify-between'>
          <span className='flex'>
          <span className="mr-2">
        <svg className="fill-rose-600 dark:fill-rose-400" style={{width: 24, height: 24}} viewBox="0 0 24 24">
          <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
          </path>
        </svg>
      </span>
      <span className="text-lg font-bold">{post.likesCount}</span>

        </span>
         <span  className='flex gap-2 items-center'>
          <span className="text-lg font-bold">{post.commentsCount}</span>

        <span className='mr-2'>
             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>

        </span>
 
      </span>
    </div>
   </div>

  {/*add  Comments content */}

  <CreateComment post={post} getposts={getposts}/>

    {/* Comment content */}

   <div className="pt-6">
       {comment? comment.map(function(comment){return<Comment isload={loading} getposts={getposts} comment={comment} deletecomment={deletecomment} post={post}/> }) :post.topComment&&<Comment isload={loading} getposts={getposts} comment={post.topComment} post={post}  deletecomment={deletecomment}/>}



    {/* More comments */}
     {!comment&&post.commentsCount>1? <div className="w-full">
      <Link to={"/postDetails/"+post._id} className="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75">Show
        more comments</Link>
    </div>
:""}

    
    
   </div>
 </article>:""}

  </>
  
}
