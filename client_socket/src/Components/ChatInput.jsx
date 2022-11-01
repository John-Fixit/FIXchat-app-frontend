import React, {useState} from 'react'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
function ChatInput() {

    const [showEmojiPicker, setshowEmojiPicker] = useState(false)
    const [msg, setmsg] = useState("")


    const handleEmojiPickerHideShow=()=>{
        setshowEmojiPicker(!showEmojiPicker)
    }
    const handleEmojiClick=(event, emoji)=>{
        console.log(emoji);
        let message = msg
        message+=emoji.emoji
        setmsg(message)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
  return (

        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill size='4vh' className='emojiColor' onClick={handleEmojiPickerHideShow}/>
                    {
                        showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} className="emoji-picker-react"/>
                    }
                </div>
            </div>
            <form className='form-container input-group' onSubmit={(e)=>handleSubmit(e)}>
                <input type="text" className='form-control' placeholder='message...' value={msg} onChange={e=>setmsg(e.target.value)}/>
                <button className="btn submit">
                    <IoMdSend size='4vh' className='text-light'/>
                </button>
            </form>
        </Container>

  )
}

const Container = styled.div`
display: flex;
align-items: center;
gap: 0.5rem;
background-color: #131324;
border-radius: 3vh;
padding: 0.5rem 0.8rem;

.button-container{
    .emoji{
        position: relative;
        svg{
            color: orange;
            cursor: pointer;    
        }
        .emoji-picker-react{
            position: absolute;
            top: -350vh;

        }
    }
}
.input-container{
    input{
        &::selection{
            background-color: #9186f3
        }
         
    }
}
`
export default ChatInput