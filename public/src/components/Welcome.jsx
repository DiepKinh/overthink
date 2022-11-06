import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";
import { BiPowerOff } from "react-icons/bi";
import CloseIcon from "../assets/CloseIcon.png";
import Leave from "../assets/leave.png";
import Remove from "../assets/remove.png";
import ConfirmIcon from "../assets/confirm.png";
import CancelIcon from "../assets/CancelIcon.png";
import {logoutRoute} from "../utils/APIRoutes";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);

  const handlePopupConfirmLogout = () =>{
    var popup = document.getElementById("popup-confirm-logout");
    popup.classList.toggle("showPopupLogout"); 
  }

  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <Container>
       <div className="chat-header">
       <div onClick={()=>handlePopupConfirmLogout()} className="buttonLogout">
          <BiPowerOff />
        </div>
      </div>
      <div className="body">
        <img src={Robot} alt="" />
        <h1>
          Welcome, <span>{userName}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
      </div>
      <div className="popupConfirmLogout" id="popup-confirm-logout">
        <div className="headerPopupLogout">
          <h4>Bạn chắc chắn muốn đăng xuất?</h4>
          <div className="closePopupLogout" onClick={() => handlePopupConfirmLogout()}>
              <img
                src={CloseIcon}
                alt="CloseIcon"
              />
          </div>
        </div>
        <div className="bodyPopupLogout">
            <div className="buttonCancelPopupLogout" onClick={() => handleClick()}>
              <img
                  src={ConfirmIcon}
                  alt="ConfirmIcon"
              />
              <p>Xác nhận</p>
            </div>
            <div className="buttonCofirmPopupLogout" onClick={() => handlePopupConfirmLogout()}>
            <img
                src={CancelIcon}
                alt="CancelIcon"
              />
              <p>Huỷ</p>
            </div>
          </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  .body{
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
      height: 20rem;
    }
    span {
      color: #4e0eff;
    }
  }
 
  .chat-header {
    display: flex;
    justify-content: right;
    padding-top:10px;
    padding-right:2rem;
  }
  .buttonLogout{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    position: relative;
    svg {
      font-size: 1.3rem;
      color: #ebe7ff;
    }
  }
  .popupConfirmLogout{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 0.5rem;
    width: 25%;
    height:15%;
    background-color: #ffffff;
    position: absolute;
    left:700px;
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
  .showPopupLogout {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
  }
`;
