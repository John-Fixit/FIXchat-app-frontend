import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import user from "../assets/user.jpg";
function Contact({ contacts, currentUser, changeChat }) {
  const [currentUserName, setcurrentUserName] = useState(undefined);
  const [currentUserImage, setcurrentUserImage] = useState(undefined);
  const [currentSelected, setcurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setcurrentUserImage(() => {
        return currentUser.profile_picture;
      });
      setcurrentUserName(() => {
        return currentUser.username;
      });
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact,) => {
      setcurrentSelected(index)
      changeChat(contact)
  };

  return (
    <>
      {currentUser && (
        <Container>
          <div className="brand text-center">
            <h2 className="chat_name fw-bold text-white">FIXchat-app</h2>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                className={`contact px-3 py-2 ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
                onClick={()=>changeCurrentChat(index, contact)}
              >
                <div className="avater w-25 h-25">
                  <img
                    src={
                      contact.profile_picture != ""
                        ? contact.profile_picture
                        : user
                    }
                    alt="profile"
                    className="rounded-circle"
                    width={"70%"}
                  />
                </div>
                <div className="username">
                  <p className="text-white fs-5">{contact.username}</p>
                </div>
              </div>
            ))}
            
          </div>
          <div className="current_user p-3">
            <div className="avater w-25">
              <img
                src={currentUserImage != "" ? currentUserImage : user}
                alt="profile"
                className="rounded-circle"
                width={"80%"}
              />
            </div>
          <div className="username">
              <h4 className="text-white">{currentUserName}</h4>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
    background-color: #080420;
    border-radius: 3vh;
    height: 85vh;
    display: grid;
    grid-template-column: 10% 75% 15%;
    overflow: hidden;
  .chat_name {
    font-family: sans-serif;
  }
  .contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
      width: 3px;
    }
    &::-webkit-scrollbar-thumb{
      background-color: grey;
      border-radius: 5vh;
    }
    &::-webkit-scrollbar-track{

      border-radius: 3vh;
    }
    
  }
  .contact{
    background-color: #ffffff12;
    cursor: pointer;
    min-height: 5rem;
    width: 90%;
    border-radius: 2vh;
    padding: 0.2rem;
    gap: 1rem;
    display: flex;
    transition: 0.5s ease-in-out;
  }
  .selected{
    background-color: #9186f3;
  }
  .current_user{
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    
  }
  
`;
export default Contact;
