import React from "react";
import styled from "styled-components";
import user from "../assets/user.jpg";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import Messages from "./Messages";
function ChatContainer({ currentChat }) {
    const handleSendMsg=(msg)=>{

    }
  return (
    <>
      <Container>
        <div className="chat-header">
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
        <Messages />
       <ChatInput handleSendMsg={handleSendMsg}/>
      </Container>
    </>
  );
}
const Container = styled.div`
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
`;
export default ChatContainer;
