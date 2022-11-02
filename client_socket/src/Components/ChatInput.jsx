import React, {useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
function ChatInput({handleSendMsg}) {

    const [showEmojiPicker, setshowEmojiPicker] = useState(false)
    const [msg, setmsg] = useState("")


    const handleEmojiPickerHideShow=()=>{
        setshowEmojiPicker(!showEmojiPicker)
    }
    const handleEmojiClick=(emoji, event)=>{
        let message = msg
        message+=emoji.emoji
        setmsg(message)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    const sendChat=(e)=>{
        e.preventDefault();
        if(msg.length >0){
            handleSendMsg(msg)
            setmsg("")
        }
    }

    const EmojiPicker=()=>{
        return(
            <Section>
                <Picker onEmojiClick={handleEmojiClick} className="emojiContainer"/>
            </Section>
        )
    }


  return (

        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill size='4vh' onClick={handleEmojiPickerHideShow} />
                    {
                        showEmojiPicker && <EmojiPicker/>
                    }
                </div>
            </div>
            <form className='input-container' onSubmit={(e)=>sendChat(e)}>
                <input type="text" className='form-control' placeholder='message...' value={msg} onChange={e=>setmsg(e.target.value)}/>
                <button className="btn submit">
                    <IoMdSend size='4vh' className='text-light'/>
                </button>
            </form>
        </Container>

  )
}

const Section=styled.div`
position:absolute;
top:-460px;
background-color: #080420;
box-shadow: 0 5px 10px #9a86f3;

` 
const Container = styled.div`
display: flex;
align-items: center;
height: 20%;
background-color: #080420;
padding: 1rem 2rem;
border-radius: 2rem;
padding-bottom: 0.3rem;
.button-container{
    display: flex;
    align-items: center;
    gap: 1rem;
    color: white;
    .emoji{
        position: relative;
        svg{
            color: orange;
            cursor: pointer;    
        }
        
    }
}
.input-container{
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;

    input{
        width: 90%;
        height: 60%;
        padding-left: 1rem;
        &::selection{
            background-color: #9186f3
        }
         
    }
}
`
export default ChatInput