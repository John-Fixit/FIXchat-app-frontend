import React, {useEffect, useState} from "react";
import styled from "styled-components";
import user from "../assets/user.jpg";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import axios from 'axios'
import {v4 as uuidv4 } from 'uuid'
import './loader.css'
import { useRef } from "react";
import { getMessageRoute, sendMessageRoute } from "../Utils/APIRoutes";
function ChatContainer({ currentChat, currentUser, socket }) {
const [messages, setmessages] = useState([])
const [arrivalMessage, setarrivalMessage] = useState(null)
const [isLoading, setisLoading] = useState(false)
const scrollRef = useRef()
  useEffect(()=>{
    if(currentChat){
      setisLoading(true)
      axios.post(getMessageRoute, {from: currentUser._id, to: currentChat._id}).then((res)=>{
        setisLoading(false)
        setmessages(res.data.projectMessages)
      })
    }
  }, [currentChat])
    const handleSendMsg=(msg)=>{
        axios.post(sendMessageRoute, {
          from: currentUser._id, 
          to: currentChat._id,
          message: msg
        });

        socket.current.emit("send-msg", {
          to: currentChat._id,
          from: currentUser._id,
          msg
        })
        const msgs = [...messages]
        msgs.push({fromSelf: true, message: msg})
        setmessages(msgs)
    }
    useEffect(()=>{
        if(socket.current){
          socket.current.on('msg-recieve', (msg)=>{
            setarrivalMessage({fromSelf: false, message: msg})
          })
        }
    }, [])

    useEffect(()=>{
      arrivalMessage && setmessages((prev)=>[...prev, arrivalMessage])
    }, [arrivalMessage])

    useEffect(()=>{
      scrollRef.current?.scrollIntoView({behaviour: "smooth"})
    }, [messages])
  return (
    <>
      <Container>
        <div className="chat-header shadow-sm">
          <div className="user-details">
            <div className="avatar">
              <img
                src={
                  currentChat.profile_picture
                    ? currentChat.profile_picture
                    : user
                }
                alt="profile picture"
                className="rounded-circle"
              />
            </div>
            <div className="username">
              <h4>{currentChat.username}</h4>
            </div>
          </div>
          <Logout />
        </div>
        <div className="chat-container text-center">
                {
                  !isLoading? (
                  messages.length ? 
                  messages.map((message, index)=>{
                    return (
                      <div ref={scrollRef} key={index} className=''>
                       
                        <div className={`message mt-1 ${message.fromSelf? 'sender justify-content-end' : 'received justify-content-start'}`}>
                          <div className="content px-2">
                            <span className="text-light text-start">{message.message}</span>
                            <span className="text-end text-light" style={{fontSize: '11px'}}>{message.time}</span>
                          </div>
                        </div>
                      </div>
                    )
                  }) :
                 <p><b>{currentChat.username} is on FIXchat</b> <br />You can start conversation!</p>): 
                 <div className="line-wobble mx-auto"></div>
                }
        </div>      
       <ChatInput handleSendMsg={handleSendMsg}/>
      </Container>
    </>
  );
}
const Container = styled.div`
overflow: hidden;
 .chat-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    .user-details{
    display: flex;
    align-items: center;
    gap: 1rem;
    }
    .avatar{
        img{
            height: 3rem;
        }
    }
    .username{
        h4{
            color: white;
        }
    }
}
.chat-container{
  min-height: 78.5vh;
  padding: 0.6rem 0.4rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .message{
    display: flex;
    align-items: center;
    .content{
      display: flex;
      flex-direction: column;
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 0.6rem;
      border-radius: 1rem;
    }
  }
  .sender{
    .content{
      background-color: #080420;
    }
  }
  .received{
    .content{
      background-color: #080495;
    }
  }
  &::-webkit-scrollbar{
    width: 3px;
    &-thumb{
      background-color: white;
      border-radius: 3px;
    }
    &-track{
      background-color: rgb(30, 30, 170);
      box-shadow: inset;
    }
  }
}

`;
export default ChatContainer;
