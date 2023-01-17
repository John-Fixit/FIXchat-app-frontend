import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../Utils/APIRoutes";
import logo from "../assets/JF logo.png";
import loginLoader from "./loginLoader.css"
function Login() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false)
  const toastOptions = {
    position: "top-left",
    autoClose: 8000,
    draggable: true,
    pauseOnHover: true,
    theme: "colored",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      let { username, password } = values;
      setisLoading(true)
      axios
        .post(loginRoute, {
          username,
          password,
        })
        .then((res) => {
          const { token, status } = res.data;
          setisLoading(false)
          if (status) {
            localStorage.setItem("userToken", JSON.stringify(token));
            toast.success(res.data.message, toastOptions);
            navigate(`/${token}`);
          } else {
            toast.error(res.data.message, toastOptions);
          }
        });
    }
  };
  const handleValidation = () => {
    const { password, username } = values;
    if (username == "") {
      toast.error("Username is required", toastOptions);
      return false;
    } else if (password == "") {
      toast.error("Password is required!", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <img src={logo} alt="logo" className="border rounded-circle" />
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="border border-danger border-3 rounded shadow p-3">
            <div className="brand bg-primary text-light py-1 rounded-pill">
              <h3 className="text-center ">FIXchat-app</h3>
            </div>
            <div className="form-group my-3">
              <label htmlFor="" className="fw-bold f-label">
                Username
              </label>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="">Username</label>
              </div>
            </div>

            <div className="form-group my-3">
              <label htmlFor="" className="fw-bold f-label">
                Password
              </label>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Username"
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="">Password</label>
              </div>
            </div>
            <button className="btn btn-primary rounded-pill w-100 fw-bold">
              {
                !isLoading? <div class="spinner">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div> :"Login Account"
              }
            </button>
            <span className="text-light">
              Don't have an account?{" "}
              <Link to="/register" className="text-decoration-none fw-bold">
                Sign up
              </Link>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  img {
    height: 8vh;
    width: 8vh;
    border: 1px solid;
    border-image: linear-gradient(45deg, blue, red) 1;

  }
  .f-label {
    color: white;
  }
`;
export default Login;
