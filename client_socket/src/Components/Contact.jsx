import React, { useState, useEffect } from "react";
import { FaBars, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styled from "styled-components";
import user from "../assets/user.jpg";
import logo from '../assets/1.png'
function Contact({ contacts, currentUser, changeChat, toggleStatusFunc, toggle }) {
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

  const changeCurrentChat = (index, contact) => {
    setcurrentSelected(index);
    changeChat(contact);
    if(window.screen.width <= 768){
        toggleStatusFunc(!toggle)
    }
  };
  const changeChatToUser = () => {
    setcurrentSelected(undefined);
    changeChat(undefined);
    if(window.screen.width <= 768){
      toggleStatusFunc(!toggle)
  }
  };

  const changeToggle=()=>{
      toggleStatusFunc(!toggle)
  }

  return (
    <>
      {currentUser && (
        <GenContainer>
          <Container className="my-2">
            <div className={`brand text-center shadow rounded bg-primary d-flex ${toggle&&'mx-1'}`}>
              <img src={logo} alt="logo" className="logo rounded-circle" />
              <p className={`chat_name fw-bold text-white`}>
                FIXchat-app
              </p>
            </div>
            <div className="contacts">
              {contacts.map((contact, index) => (
                <div
                  className={`contact px-2 py-2 ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <img
                    src={
                      contact.profile_picture != ""
                        ? contact.profile_picture
                        : user
                    }
                    alt="profile"
                    className="rounded-circle avatar"
                  />
                  <div className="username">
                    <span className="text-white">{contact.username}</span>
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`current_user ${
                currentSelected == undefined && "selected"
              }`}
              onClick={changeChatToUser}
            >
              <img
                src={currentUserImage != "" ? currentUserImage : user}
                alt="profile"
                className="rounded-circle img"
              />
              <h3 className="text-white">{currentUserName}</h3>
            </div>
          </Container>
          <div className="barIcon mt-2" onClick={changeToggle}>
            {
              toggle?<FaArrowLeft size={'4vh'}/>: <FaArrowRight size={'4vh'}/>
            }
          </div>
        </GenContainer>
      )}
    </>
  );
}

const GenContainer = styled.div`
  display: flex;
  justify-content: center;
  .barIcon{
    cursor: pointer;
  }
`;
const Container = styled.div`
  background-color: #080420;
  display: grid;
  border-radius: 1.5vh;
  height: 94vh;
  overflow: hidden;
  .brand{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    margin: 1vh 2vh;
    gap: 0.75rem;
    .logo{
      height: 2.5rem;
      width: 2.5rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    // align-items: center;
    height: 70vh;
    overflow: auto;
    overflow-x: hidden;
    padding: 3px;
    gap: 0.5rem;
    &::-webkit-scrollbar {
      width: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: navy;
      border-radius: 5vh;
    }
    &::-webkit-scrollbar-track {
      background-color: white;
      border-radius: 3vh;
    }
  }
  .contact {
    background-color: #ffffff12;
    cursor: pointer;
    height: 3.5rem;
    display: flex;
    // width: 90%;
    border-radius: 2vh;
    padding: 0.2rem;
    gap: 1rem;
    transition: 0.5s ease-in-out;
  }
  .avatar {
    height: 2.7rem;
    width: 2.7rem;
  }
  .selected {
    background-color: #9486e6 !important;
  }
  .current_user {
    background-color: #0d0d30;
    display: flex;
    // justify-content: center;
    cursor: pointer;
    max-height: 13vh;
    align-items: center;
    border-radius: 1vh 1vh 0 0;
    gap: 0.7rem;
    .img {
      height: 3.5rem;
      width: 3.5rem;
    }
  }

`;
export default Contact;
