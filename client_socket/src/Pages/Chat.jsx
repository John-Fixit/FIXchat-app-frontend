import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allUserRoute, chatRoute, host } from "../Utils/APIRoutes";
import styled from "styled-components";
import { useState } from "react";
import Contact from "../Components/Contact";
import Welcome from "../Components/Welcome";
import ChatContainer from "../Components/ChatContainer";
import { io } from "socket.io-client";
import "./chatLoader.css";

function Chat() {
  const routerParameter = useParams()
  const navigate = useNavigate();
  const [currentUser, setcurrentUser] = useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [contacts, setcontacts] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    authUser();
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);
  const socket = useRef();
  const authUser = () => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    axios
      .get(chatRoute, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (res.data.status) {
          if(routerParameter.id != token){
              navigate('/login')
          }
          setcurrentUser(() => {
            return res.data.thisUser;
          });
          localStorage.setItem(
            "chat-app-user",
            JSON.stringify(res.data.thisUser)
          );
          let thisUserId = JSON.parse(
            localStorage.getItem("chat-app-user")
          )._id;
          let id = currentUser?currentUser._id: thisUserId
          axios.get(`${allUserRoute}/${id}`).then((res) => {
            if (res.data.status) {
              setisLoading(false);
              setcontacts(() => {
                return res.data.allUser;
              });
            }
          });
        } else {
          navigate("/login");
        }
      });
  };

  const handleChatChange = (chat) => {
    setcurrentChat(() => {
      return chat;
    });
  };

  return (
    <>
      <Container>
        <div className="container col-sm-9 bg-primary chat_area rounded">
          {isLoading ? (
            <div class="loader"></div>
          ) : (
            <div className="row">
              <div className="col-4">
                <Contact
                  contacts={contacts}
                  currentUser={currentUser}
                  changeChat={handleChatChange}
                />
              </div>
              <div className="col-8">
                {currentChat == undefined ? (
                  <Welcome currentUser={currentUser} />
                ) : (
                  <ChatContainer
                    currentChat={currentChat}
                    currentUser={currentUser}
                    socket={socket}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #131324;
  .container {
    heigth: 50vh;
    //   display: grid;
    //   grid-template-column: 25% 75%;
  }
`;

export default Chat;
