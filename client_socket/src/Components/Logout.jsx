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
        {/* <button className="btn btn-danger text-light" onClick={handleClick}><FaRegArrowAltCircleUp size='3.5vh' className='thisIcon' /></button> */}

       <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
       <FaRegArrowAltCircleUp size='3.5vh' className='thisIcon' />
       </button>
       <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
           <div class="modal-content">
             <div class="modal-header text-center mx-auto">
               <h5 class="modal-title" id="exampleModalLabel">
               Are You sure you want to <span className='text-danger fw-bold'>Log out</span>
               </h5>
              </div>
             
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
               <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={handleClick}>Log Out</button>
             </div>
           </div>
         </div>
       </div>
        </div>
  )
}

export default Logout