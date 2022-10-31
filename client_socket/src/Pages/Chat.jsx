import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allUserRoute, chatRoute } from "../Utils/APIRoutes";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import Contact from "../Components/Contact";
function Chat() {
  const navigate = useNavigate();
  const [currentUser, setcurrentUser] = useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined)
  const [contacts, setcontacts] = useState([]);
  useEffect(() => {
    authUser();
    getAllUser();
  }, []);

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
          setcurrentUser(() => {
            return res.data.thisUser;
          });
          localStorage.setItem(
            "chat-app-user",
            JSON.stringify(res.data.thisUser)
          );
        } else {
          navigate("/login");
        }
      });
  };

  const handleChatChange=(chat)=>{
    setcurrentChat(chat)
  }

  const getAllUser = () => {
      console.log(currentUser);
      let thisUserId = (JSON.parse(localStorage.getItem('chat-app-user')))._id
      let id = currentUser? currentUser._id : thisUserId
    axios.get(`${allUserRoute}/${id}`).then((res) => {
      if (res.data.status) {
        
        setcontacts(() => {
          return res.data.allUser;
        });
      }
    });
  };
  return (
    <>
      <Container>
        <div className="container col-9 row bg-primary chat_area py-3 rounded">
          <div className="col-4">
            <Contact contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
          </div>
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
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container{
    height: 90vh;
    width: 90vw;
  }
`;

export default Chat;
