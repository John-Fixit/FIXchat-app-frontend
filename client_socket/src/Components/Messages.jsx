import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

function Messages({ messages }) {
  useEffect(() => {
    console.log(messages);
  });
  return (
    <Container>
      <div className="chat-container">
        {messages.map((message) => {
          return (
            <div>
              <div className={`message ${message.fromSelf? 'sender text-start' : 'recieved text-end'}`}>
                <div className="content fs-5 rounded-3">
                  <p className="text-light">{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 68.5vh;
  .chat-container{
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .message{
      display: flex;
      align-items: center;
      .content{
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.6rem;
      }
    }
  }
`;
export default Messages;
