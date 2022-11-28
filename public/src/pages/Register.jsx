import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute ,inputOTP} from "../utils/APIRoutes";
import CloseIcon from "../assets/CloseIcon.png";
import ConfirmIcon from "../assets/confirm.png";
import CancelIcon from "../assets/CancelIcon.png";
export default function Register() {
  const [otp, setOtp] = useState();
  const [username, setUsername] = useState();
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleChangeOTP = (event) => {
    setOtp( event.target.value );
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        setUsername(username);
        var popup = document.getElementById("popup-confirm-popup");
        popup.classList.toggle("showPopupDelete"); 
        
      }
    }
  };

  const handlePopup = () =>{
    var popup = document.getElementById("popup-confirm-popup");
    popup.classList.toggle("showPopupDelete"); 
  }

  const handleSubmitOTP = async (event) => {
    event.preventDefault();
    const { data1 } = await axios.post(inputOTP, {
      username,
      otp,
    });
    navigate("/");
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>

              {/* POPUP LOGOUT */}
      <div className="popupConfirmLogout" id="popup-confirm-popup">
        <div className="headerPopupLogout">
          <h4>Nhập mã OTP?</h4>
          <div className="closePopupLogout" onClick={() => handlePopup()}>
              <img
                src={CloseIcon}
                alt="CloseIcon"
              />
          </div>
        </div>
        <div>
        <input
          className="textOTP"
            type="text"
            placeholder="OTP"
            name="otp"
            onChange={(e) => handleChangeOTP(e)}
            min="3"
          />
        </div>
        <div className="bodyPopupLogout">
            <div className="buttonCancelPopupLogout" onClick={(event) => handleSubmitOTP(event)}>
              <img
                  src={ConfirmIcon}
                  alt="ConfirmIcon"
              />
              <p>Xác nhận</p>
            </div>
            <div className="buttonCofirmPopupLogout" onClick={() => handlePopup()}>
            <img
                src={CancelIcon}
                alt="CancelIcon"
              />
              <p>Huỷ</p>
            </div>
          </div>
      </div>
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
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }

  .popupConfirmLogout{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 0.5rem;
    width: 25%;
    height:20%;
    background-color: #ffffff;
    position: absolute;
    left:600px;
    top: 250px;
    padding:10px;
    visibility:hidden;
  }

  .headerPopupLogout{
    width: 100%;
    height:20%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    h4{
      width: 90%;
      align-items: center;
      color: #0d0d30;
    }
    .closePopupLogout{
      display: flex;
      img{
        justify-content: flex-end;
      width: 2rem;
      }
    }
    input{
      color:white
    }
  }
  .bodyPopupLogout{
    width: 100%;
    height:40%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    .buttonCancelPopupLogout{
      display: flex;
      align-items: center;
      flex-direction: row;
      background-color: #bfb;
      border-radius: 1rem;
      padding:7px 12px;
      justify-content: space-between;
      img{
        width: 2rem;
      }
    }

    .buttonCofirmPopupLogout{
      width: 100px;
      display: flex;
      align-items: center;
      flex-direction: row;
      background-color: #fbf;
      border-radius: 1rem;
      padding:7px 10px;
      justify-content: space-around;
      img{
        width:1.6rem;
      }
    }
  }
  .showPopupDelete {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
  }
  .textOTP{
    color: #0d0d30;
    height:40px;
    width: 100%;
  }
`;
