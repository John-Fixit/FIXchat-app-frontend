import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { allUserRoute, chatRoute } from '../Utils/APIRoutes'
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify'
import { useState } from 'react'
function Chat() {
const navigate = useNavigate()
const [currentUser, setcurrentUser] = useState(undefined)
const [contacts, setcontacts] = useState([])
  useEffect(()=>{
    authUser()
    getAllUser()
  }, [])


  const authUser =()=>{
      const token = JSON.parse(localStorage.getItem('userToken'))
      axios.get(chatRoute, {headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }}).then((res)=>{
        if(res.data.status){
          setcurrentUser(()=>{return res.data.thisUser})
          localStorage.setItem('chat-app-user', JSON.stringify(res.data.thisUser))
        }else{
            navigate('/login')
            // localStorage.removeItem('chat-app-user')
          }
      })
  }

  const getAllUser =()=>{
      axios.get(allUserRoute).then((res)=>{
        console.log(res);
          if(res.data.status){
            //not recieving allUsers from the server....
            setcontacts(()=>{return res.data.allUser})
          }
      })
  }
  return (
    <>
        <Container>
          <div className="container col-10 row ">
              {/* nffj */}
          </div>
        </Container>

    </>
  )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
gap: 1rem;
align-items: center;
background-color: #131324;

`

export default Chat