import React, {useState} from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { loginRoute } from "../Utils/APIRoutes";
function Login() {
  const navigate = useNavigate()
  const [values, setvalues] = useState({
    username: "",
    password: "",
  })
  const toastOptions = {
    position: 'top-left',
    autoClose: 8000,
    draggable: true,
    pauseOnHover: true,
    theme: "colored"
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(handleValidation()){
      let {username, password} = values
      axios.post(loginRoute, {
        username, password
      }).then((res)=>{
        const {token, status} = res.data
          if(status){
            localStorage.setItem('userToken', JSON.stringify(token))
            toast.success(res.data.message, toastOptions)
            navigate(`/${token}`)
          }
          else{
            toast.error(res.data.message, toastOptions)
          }
      })
    }
  };
  const handleValidation =()=>{
    const {password, username} = values;
    if(username == ""){
      toast.error('Username is required', toastOptions)
      return false
}
   else if(password == ""){
      toast.error('Password is required!', toastOptions)
      return false
    }
    return true
  }
  const handleChange=(e)=>{
      setvalues({...values, [e.target.name]: e.target.value})
  }
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="col-md-5 mx-auto shadow p-3">
            <div className="brand bg-primary text-light py-2 rounded-pill">
              <h1 className="text-center ">FIXchat-app</h1>
            </div>
            <div className="form-group my-3">
              <label htmlFor="" className="fw-bold f-label">Username</label>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  onChange={e=>handleChange(e)}
                />
                <label htmlFor="">Username</label>
              </div>
            </div>
            
            <div className="form-group my-3">
              <label htmlFor="" className="fw-bold f-label">Password</label>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Username"
                  name="password"
                  onChange={e=>handleChange(e)}
                />
                <label htmlFor="">Password</label>
              </div>
            </div>
            <button className="btn btn-primary rounded-pill w-100 fw-bold">Login Account</button>
            <span className="text-light">
              Don't have an account? <Link to="/register" className="text-decoration-none fw-bold">Sign up</Link>
            </span>
          </div>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  .f-label{
    color: white;
  }

`;
export default Login;
