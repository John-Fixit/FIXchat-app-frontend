import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../Utils/APIRoutes";
import logo from "../assets/JF logo.png";
import BarLoader from "react-spinners/BarLoader";
import useSWR from "swr"
function Register() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [values, setvalues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const styleCss = {
    width: "100%",
    margin: "0 auto",
    borderRadius: "5px 5px 0 0",
  };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    draggable: true,
    pauseOnHover: true,
    theme: "colored",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      let { username, email, password, confirmPassword } = values;
      setisLoading(true);
      axios
        .post(registerRoute, {
          username: username.toLowerCase(),
          email,
          password,
          profile_picture: "",
        })
        .then((res) => {
          setisLoading(false);
          if (res.data.status) {
            toast.success(res.data.message, toastOptions);
            navigate("/login");
          } else {
            toast.error(res.data.message, toastOptions);
          }
        });
    }
  };
  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (username.length < 3) {
      toast.error(
        "Username should not be less than 3 character!",
        toastOptions
      );
      return false;
    } else if (email == "") {
      toast.error(
        "Email is required, please enter your email address",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password must be the same!",
        toastOptions
      );
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
        <form onSubmit={(e) => handleSubmit(e)} className={`col-sm-4`}>
          <div className="shadow px-3 py-2 border border-danger border-3 rounded">
            <div className="header">
              <Link to={'/'}>
              <img src={logo} alt="logo" className="border rounded-circle" />
              </Link>
              <p className="text-light my-auto">
              Already have an account <Link to="/login" className="text-decoration-none fw-bold">Login</Link>
            </p>
            </div>
            <div className="brand bg-primary text-light py-1 rounded">
              <h3 className="text-center ">FIXchat-app</h3>
            </div>
            <BarLoader
              loading={isLoading}
              color={"red"}
              cssOverride={styleCss}
            />
            <div className="form-group">
              <label htmlFor="" className="fw-bold f-label">
                Username
              </label>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="username"
                  autoComplete="off"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="">Username</label>
              </div>
            </div>
            <div className="form-group my-3">
              <label htmlFor="" className="fw-bold f-label">
                Email
              </label>
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  placeholder="email"
                  name="email"
                  autoComplete="off"

                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="">Email</label>
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
            <div className="form-group my-3">
              <label htmlFor="" className="fw-bold f-label">
                Confirm Password
              </label>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  placeholder="ConfirmPassword"
                  name="confirmPassword"
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="">Confirm password</label>
              </div>
            </div>
            <button className="btn btn-primary rounded-pill w-100 fw-bold">
              Create User
            </button>
          </div>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  // flex-direction: column;
  align-items: center;
  background-color: #131324;
  .header{
    display: flex;
    justify-content: space-between;
  }
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
export default Register;
