import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../Utils/APIRoutes";
import logo from "../assets/JF logo.png";
import loginLoader from "./loginLoader.css";

import BarLoader from "react-spinners/BarLoader";
function Login() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const override = {
    margin: "0 auto",
    width: "100%",
    borderRadius: "5px 5px 0 0",
  };

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
      setisLoading(true);
      axios
        .post(loginRoute, {
          username: username.toLowerCase(),
          password,
        })
        .then((res) => {
          const { token, status } = res.data;
          setisLoading(false);
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
        <form onSubmit={(e) => handleSubmit(e)} className={`col-sm-4`}>
          <div className="border border-danger border-3 rounded shadow p-3">
            <div className="header">
              <Link to={"/"} className="text-center">
                <img src={logo} alt="logo" className="border rounded-circle" />
              </Link>
              <p className="text-light my-auto">
                Don't have an account?{" "}
                <Link to="/register" className="text-decoration-none fw-bold">
                  Sign up
                </Link>
              </p>
            </div>
            <div className="brand bg-primary text-light py-1 rounded">
              <h3 className="text-center ">FIXchat-app</h3>
            </div>
            <BarLoader
              color={`red`}
              loading={isLoading}
              cssOverride={override}
            />
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
                  autoComplete="off"
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
              Login Account
            </button>
            <div>
              <p className="forgotPswBtn text-light my-2" onClick={()=>navigate('/login/forgot_password')}>Forgotten Password</p>
            </div>
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
  .forgotPswBtn {
    cursor: pointer;

  }
  .home_btn {
    display: flex;
    align-items: center;
    cursor: pointer;

    gap: 0.5rem;
    .home_btn_text {
      margin: auto;
    }
    &:hover {
      color: #dc3545 !important;
      transition: all 0.3s ease;
    }
  }
`;
export default Login;
