import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/JF logo.png";
import BarLoader from "react-spinners/BarLoader";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { forgotPassword } from "../Utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ForgotPassword() {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const override = {
    margin: "0 auto",
    width: "100%",
    borderRadius: "5px 5px 0 0",
  };

  const toastOption = {
    position: "top-center",
    autoClose: 8000,
    draggable: true,
    pauseOnHover: true,
    theme: "colored",
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (value) => {
      setisLoading(true);
      axios
        .put(forgotPassword, value)
        .then((res) => {
          setisLoading(false);
          if (res.data.status) {
            toast.success(res.data.message, toastOption);
            formik.values.email = ""
          }
          else{
              toast.error(res.data.message, toastOption);
          }
        })
        .catch((err) => {
          setisLoading(false);
          toast.error(err.message, toastOption);
        });
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email is required before you can continue!")
        .email("PLEASE enter a valid email"),
    }),
  });
  return (
    <Container>
      <form onSubmit={formik.handleSubmit} className={`col-sm-4`}>
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
          <BarLoader color={`red`} loading={isLoading} cssOverride={override} />
          <div className="text-light">
            <i>
              Enter the email address you used to create your FIXCHAT account.
              we'll send you a password reset email.
            </i>
          </div>
          <div className="form-group my-3">
            <input
              type="email"
              className="form-control email_input"
              placeholder="Enter your email address"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <i className="text-danger fw-light err_msg">
              {formik.touched.email && formik.errors.email}
            </i>
          </div>
          <div className="my-3">
            <button
              type="submit"
              className="btn btn-primary rounded-pill w-100 fw-bold"
            >
              Reset Password
            </button>
          </div>
          <div className="text-end">
            <span
              className="signInBtn text-light my-1"
              onClick={() => navigate("/login")}
            >
              Back to login
            </span>
          </div>
        </div>
      </form>
      <ToastContainer />
    </Container>
  );
}

export default ForgotPassword;
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .header {
    display: flex;
    justify-content: space-between;
  }
  .err_msg {
    font-size: 2.4vh !important;
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
  .signInBtn {
    cursor: pointer;
    &:hover {
      transition: 0.1s linear;
      border-bottom: 4px solid #0d6efd;
    }
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
