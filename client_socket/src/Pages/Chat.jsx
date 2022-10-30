import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { chatRoute } from '../Utils/APIRoutes'
import { ToastContainer, toast } from 'react-toastify'
function Chat() {
const navigate = useNavigate()
  useEffect(()=>{
    authUser()
  }, [])

// in the tutorial, I got to where 1: 54: 46 where he want to be ddesigning the chat area page.
  const authUser =()=>{
      const token = JSON.parse(localStorage.getItem('userToken'))
      axios.get(chatRoute, {headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }}).then((res)=>{
        if(res.data.status){
          localStorage.setItem('chat-app-user', JSON.stringify(res.data.thisUser))
        }else{
            navigate('/login')
          }
      })
  }

  return (
    <>
    
      <ToastContainer />
    </>
  )
}


export default Chat