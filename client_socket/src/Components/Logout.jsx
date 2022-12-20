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
       <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
       <FaRegArrowAltCircleUp size='3.5vh' className='thisIcon' />
       </button>
       <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
           <div className="modal-content">
             <div className="modal-header text-center mx-auto">
               <h5 className="modal-title" id="exampleModalLabel">
               Are You sure you want to <span className='text-danger fw-bold'>Log out</span>
               </h5>
              </div>
             
             <div className="modal-footer">
               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
               <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleClick}>Log Out</button>
             </div>
           </div>
         </div>
       </div>
        </div>
  )
}

export default Logout