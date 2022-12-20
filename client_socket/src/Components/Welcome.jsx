import React, { useEffect } from "react";
import styled from "styled-components";
import robot from "../assets/robot.gif";
import defaultAvatar from "../assets/user.jpg";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { uploadProfileAvatar } from "../Utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Typewriter from 'typewriter-effect'

function Welcome({ currentUser }) {
  const [isLoading, setisLoading] = useState(false);
  const handleSelectFile = (e) => {
    const fileSelected = e.target.files[0];
    const fileExtensions = ["jpg", "png", "gif", "jpeg"];
    let fileSelectedExtension = fileSelected.name.split(".")[1];
    const toastOption = {
      position: "top-right",
      duration: 5000,
      autoClose: true,
      pauseOnHover: true,
    };
    if (fileExtensions.includes(fileSelectedExtension)) {
      let reader = new FileReader();
      reader.readAsDataURL(fileSelected);
      reader.onload = () => {
        setisLoading(true);
        axios
          .post(uploadProfileAvatar, {
            id: currentUser._id,
            fileUrl: reader.result,
          })
          .then((response) => {
            setisLoading(false);
            response.data.status
              ? 
                window.location.reload()
              
              : toast.error(response.data.message, {
                  position: `top-right`,
                  duration: 5000,
                  autoClose: true,
                  pauseOnHover: true,
                });
          })
          .catch((error) => {
            toast.error(error.message, toastOption);
            setisLoading(false);
          });
      };
    } else {
      toast.error(
        "file Type selected is not allowed (only 'png', 'jpg, 'gif', 'jpeg') file is required",
        toastOption
      );
    }
  };
  return (
    <>
      {currentUser && (
        <Container>
          <Profile_avatar>
              <div className="text-center">
                <h4 className="text-color">Optional</h4>
                <span >Change Profile Picture for Ease recommendation by others</span>
              </div>
            <div className="avatar">
              <img
                src={currentUser.profile_picture != ""? currentUser.profile_picture: defaultAvatar}
                alt="loading"
                className="rounded-circle"
              />
            <label htmlFor="userAvatarFile" className="">
              <div
                className={`bg-color rounded-circle px-1 ${
                  isLoading && "d-none"
                }`}
              >
                <FaPencilAlt />
              </div>
              <div
                className={`spinner-border text-color ${
                  isLoading ? "d-block" : "d-none"
                }`}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <input
                type="file"
                id="userAvatarFile"
                className="d-none"
                onChange={(e) => handleSelectFile(e)}
              />
            </label>
            </div>
          </Profile_avatar>
          <img src={robot} alt="robot" className="robot" width={`30%`}/>
          <div className="text-center">
            <h2>
              Welcome <span>{currentUser.username}!</span>
            </h2>
            <h4 className="text-light">Please select a chat to start messaging
            </h4>
          </div>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}
const Profile_avatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .bg-color {
    background-color: #131324;
  }
  .text-color {
    color: #131324;
  }
  .avatar {
    img {
      height: 25vh;
      width: 25vh;
    }
  }
  @media only screen and (max-width: 768px)and (min-width: 50px){
      .avatar{
        img {
          height: 15vh;
          width: 15vh;
        }
      }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  span {
    color: #131324;
  }
  .robot{
    width: 10vh important;
  }
  @media only screen and (max-width: 768px)and (min-width: 50px){
    .robot{
      width: 40vh !important;
    }
}
`;
export default Welcome;
