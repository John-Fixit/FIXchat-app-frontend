import React from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import getStartedBtn from "./getStartedBtn.css"
import { useNavigate } from "react-router-dom";
function Homepage() {
    const navigate = useNavigate()
    const goToSignup =()=>{
        navigate('/register');
    }
  return (
    <>
      <Navbar />
      <Container className="bg-image">
        <div className="home_body px-lg-5 px-3">
          <div className="body_left_cont">
            <h2 className="ultimate_comm">
              <span className="text-danger">FIXCHAT</span> the Ultimate
              Communication Platform
            </h2>
            <p>
              Get in touch and communicate to your family, friends and sibling{" "}
              <br /> = = = = = = == = = = = = = = = = = = = = = = = = = = = = =
              = == = = = = = == = ={" "}
            </p>
            <button className="button rounded-pill border-danger" onClick={goToSignup}>
    <span className="button-content">Get Started Here</span>
</button>
          </div>
          <div className="body_right_cont">
            <p className="user_chatting"></p>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Homepage;

const Container = styled.div`
  .bg-image {
    &::-webkit-scrollbar {
      width: 3px;
    }
  }
  .home_body {
    height: 100vh;
    display: flex;
    overflow: auto;
    justify-content: space-evenly;
    align-items: center;
    .body_left_cont {
      .ultimate_comm {
        font-family: sans-serif !important;
        font-weight: bold;
        font-size: 3.5rem;
        color: rgb(7, 7, 73);
        span {
          font-family: sans-serif !important;
          font-size: 4.5rem;
        }
      }
    }
    .body_right_cont {
      position: relative;
      .user_chatting {
        position: absolute;
        top: 9rem;
        right: 8.5rem;
        animation: img1 2s
          cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }
      @keyframes img1 {
        0% {
          transform: translateY(-600px) rotateX(-30deg) scale(0);
          transform-origin: 50% 100%;
          opacity: 1;
        }
        20%{
            transform: translateX(-600px) rotateX(-30deg) scale(1);
            opacity: 1;
        }
        100% {
          transform: translateY(0) rotateX(0) scale(1);
          transform-origin: 50% 1400px;
          opacity: 1;
        }
      }
    }
  }
  @media only screen and (max-width: 868px) {
    margin-top: 4.5rem;
    .home_body {
      display: block;
      .body_left_cont {
        .ultimate_comm {
          font-size: 2.5rem;
          word-wrap: break-word;
          span {
            font-size: 3rem;
          }
        }
      }
      .body_right_cont {
        .user_chatting{
            top: 5rem;
            right: 5rem;
        }
      }
    }
  }
`;
