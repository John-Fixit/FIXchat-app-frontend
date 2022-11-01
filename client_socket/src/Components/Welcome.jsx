
import React, {useEffect} from 'react'
import styled from 'styled-components';
import robot from '../assets/robot.gif'
function Welcome({currentUser}) {
  return (
    <>
        {
          currentUser && (
            <Container>
              <img src={robot} alt="robot" width={'40%'}/>
              <h2>Welcome <span>{currentUser.username}!</span></h2>
              <h4>Please select a chat to start messaging</h4>
            </Container>
          )
        }
    </>
  
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  span{
    color: #131324;
  }
`;
export default Welcome