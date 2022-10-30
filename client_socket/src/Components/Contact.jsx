import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import user from "../assets/user.jpg";
function Contact({ contacts, currentUser }) {
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

  const changeCurrentChat = (index, contact) => {};


    //tutorial was paused on 02: 23: 24 styling the contact and getting the contacts
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
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
              >
                <div className="avater">
                  <img
                    src={
                      contact.profile_picture != ""
                        ? contact.profile_picture
                        : user
                    }
                    alt="profile"
                    className="rounded-circle"
                    width={"20%"}
                  />
                </div>
                <div className="username">
                  <h3 className="text-white">{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current_user">
            <div className="avater">
              <img
                src={currentUserImage != "" ? currentUserImage : user}
                alt="profile"
                className="rounded-circle"
                width={"20%"}
              />
            </div>
            <div className="username">
              <h2 className="text-white">{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
    background-color: #080420;
  .chat_name {
    font-family: sans-serif;
  }
  .contacts{
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
  }
`;
export default Contact;
