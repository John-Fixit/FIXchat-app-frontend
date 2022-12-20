import React from 'react'
import { useNavigate } from 'react-router-dom'
import {FaRegArrowAltCircleUp} from 'react-icons/fa' 
function Logout() {
    const navigate = useNavigate()

    const handleClick=()=>{
        localStorage.clear()
        navigate('/login')
    }
  return (
    <div>
        <button className="btn btn-danger text-light" onClick={handleClick}><FaRegArrowAltCircleUp size='3.5vh' className='thisIcon' /></button>
        </div>
  )
}

export default Logout