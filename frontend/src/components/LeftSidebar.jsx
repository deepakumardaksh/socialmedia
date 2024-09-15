import { setAuthUser } from '@/redux/authSlice'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import axios from 'axios'
import {  Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import CreatePost from './CreatePost'


const LeftSidebar = () => {
  const navigate=useNavigate();
  const {user}=useSelector(store=>store.auth)
const dispatch=useDispatch();
const [open,setOpen]=useState(false);
  const logoutHandler=async()=>{
    try {
      const res=await axios.get('http://localhost:8000/api/v1/user/logout',{withCredentials:true});
      if(res.data.success){
        dispatch(setAuthUser(null));
        navigate('/login')
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  const sidebarHandler=(textType)=>{
    if(textType=="Logout")  {
      logoutHandler();
    }
    else if(textType=="Create"){
      setOpen(true);   
     }
  }


  const sidebarItem=[
    {icon:<Home/>, text:"Home"},
    {icon:<Search/>, text:"Search"},
    {icon:<TrendingUp/>, text:"Explore"},
    {icon:<MessageCircle/>, text:"Message"},
    {icon:<Heart/>, text:"Notification"},
    {icon:<PlusSquare/>, text:"Create"},
    {icon:(
      <Avatar className='w-6 h-6 rounded-lg'>
        <AvatarImage src={user?.profilePicture} alt="@shadcn" />
        <AvatarFallback></AvatarFallback>
      </Avatar>
    ),
  text:"Profile"
  },
  {icon:<LogOut/>, text:"Logout"}, 
]

  return (
    <div className='fixed top-0 z-10 left-0 border-r border-gray-300 w-[16%] h-screen'>
      <div className='flex flex-col'>
        <h1 className='my-8 pl-3 font-bold text-xl'>LOGO</h1>
        <div>
        {
        sidebarItem.map((item,index)=>{
          return (
            <div onClick={()=>sidebarHandler(item.text)}
             key={index} className='flex items-center gap-3 relative hover:bg-gray-100 cursor-pointer rounded-lg p-3 my-3'>
{item.icon}
<span>{item.text}</span>
            </div>
          )
        })
      }
        </div>
     
      </div>
 <CreatePost open={open} setOpen={setOpen}/>
    </div>
  )
}

export default LeftSidebar