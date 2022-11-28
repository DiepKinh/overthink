import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute,logoutRoute, updateUserName,updatePassword} from "../utils/APIRoutes";
import CloseIcon from "../assets/CloseIcon.png";
import Leave from "../assets/leave.png";
import Remove from "../assets/remove.png";
import ConfirmIcon from "../assets/confirm.png";
import CancelIcon from "../assets/CancelIcon.png";
import { useNavigate, Link } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import PenFix from "../assets/PenFix.png";
import Change from "../assets/Change.png";
import EditAvatar from "../assets/EditAvatar.png";

export default function Profile() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentUserId, setCurrentUserId] = useState(undefined);
  const [currentPw, setCurrentPw] = useState(undefined);
  const [newName, setNewName] = useState("");

  const [values, setValues] = useState({
    passwordOld: "",
    passwordNew: "",
    confirmPassword: "",
  });

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
    setCurrentUserId(data._id);
    setCurrentPw(data.password)
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handlePopupChangeUser = () =>{
    var popup = document.getElementById("popup-change-username");
    popup.classList.toggle("showPopupChangeUser"); 
  }

  const handleInputChangeUser = (event) => {
    setNewName(event.target.value);
  };

  const handlePopupPassword = () =>{
    var popup = document.getElementById("popup-change-password");
    popup.classList.toggle("showPopupChangePassword"); 
  }

  const handleUpdateName = async () => {
    if(newName.length >0){
        const user = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          );
    
          const { data } = await axios.post(`${updateUserName}/${user._id}`, {
            username:newName,
          });
    
          if (data.status) {
            user.username = data.username;
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(user)
            );
            navigate("/");
            window.location.reload();
          }
    }
    
    
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { passwordOld, passwordNew, confirmPassword } = values;
    // if (!isPasswordValid) {
    //   return false;
    // } else 
    if (passwordNew.length < 8) {
      return false;
    } else if (passwordNew !== confirmPassword) {
      return false;
    }
    return true;
  };

  const handleUpdatePassword = async () => {
    const { passwordOld, passwordNew, confirmPassword } = values;
    if(handleValidation){
        const user = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          );
    
          const { data } = await axios.post(`${updatePassword}/${user._id}`, {
            password:passwordNew,
          });
    
          if (data.status) {
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(user)
            );
            navigate("/");
            window.location.reload();
          }
    }

  };


  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
            <h1>Thông tin cá nhân</h1>
        </div>
        {/* <Logout /> */}
        <div onClick={()=>handlePopupConfirmLogout()} className="buttonLogout">
          <BiPowerOff />
        </div>
      </div>

      <div className="user-body">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="penFix">
              <img
                src={EditAvatar}
                alt="avatar"
              />
            </div>
            <div className="nameUser">
              <h2>{currentUserName}</h2>
              <img
                onClick={()=>handlePopupChangeUser()}
                src={PenFix}
                alt="avatar"
              />
            </div>
        </div>
        <div className="user-bottom">
            <div onClick={()=>handlePopupPassword()} className="buttonChangePassword">
                 <img
                      src={Change}
                      alt="ConfirmIcon"
                  />
                  <p>Thay đổi mật khẩu</p>
            </div>
        </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
          <div className="message sended">
            <img src={msg} alt="" />
          </div>
        
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

        {/* POPUP CHANGE TAI KHOAN */}
        <div className="popupChangeUserName" id="popup-change-username">
        <div className="headerChangeUserName">
          <h4>Nhập tên tài khoản mới</h4>
          <div className="closePopupLogout" onClick={() => handlePopupChangeUser()}>
              <img
                src={CloseIcon}
                alt="CloseIcon"
              />
          </div>
        </div>
        <div class="body">
            <input
                type="text"
                placeholder="Nhập tên mới"
                name="nameGroup"
                onChange={(e) => handleInputChangeUser(e)}
                min="3"
                />
        </div>
        <div className="bodyChangeUserName">
            <div className="buttonCancelPopupLogout" onClick={() => handleUpdateName()}>
              <img
                  src={ConfirmIcon}
                  alt="ConfirmIcon"
              />
              <p>Xác nhận</p>
            </div>
          </div>
      </div>

       {/* POPUP CHANGE PASSWORD */}
       <div className="popupChangePassword" id="popup-change-password">
        <div className="headerChangePassword">
          <h4>Thây đổi mật khẩu</h4>
          <div className="closePopupLogout" onClick={() => handlePopupPassword()}>
              <img
                src={CloseIcon}
                alt="CloseIcon"
              />
          </div>
        </div>
        <div class="body">
            <label>Nhập mật khẩu cũ</label>
            <input
                type="password"
                placeholder="Nhập mật khẩu cũ"
                name="passwordOld"
                onChange={(e) => handleChange(e)}
                min="3"
                />
            <label>Nhập mật khẩu mới</label>
                 <input
                type="password"
                placeholder="Nhập mật khẩu mới"
                name="passwordNew"
                onChange={(e) => handleChange(e)}
                min="3"
                />
             <label>Xác nhận mật khẩu mới</label>
                 <input
                type="password"
                placeholder="Xác nhận mật khẩu mới"
                name="confirmPassword"
                onChange={(e)  => handleChange(e)}
                min="3"
                />
        </div>
        <div className="bodyChangePassword">
            <div className="buttonCancelPopupLogout" onClick={() => handleUpdatePassword()}>
              <img
                  src={ConfirmIcon}
                  alt="ConfirmIcon"
              />
              <p>Xác nhận</p>
            </div>
          </div>
      </div>

    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 70% 20%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      h1 {
        color: white;
      }
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
      img{
        width: 200px;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
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

  .user-body{
    position: relative;
    width:100%;
    .avatar{
        
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            align-items: center;
            width:8rem;
        }
    }
    .penFix{
        cursor: pointer;
        background-color: rgba(99, 94, 94, 0.7);
        border-radius:100px;
        padding: 2px 0px;
        position: absolute;
        top: 90px;
        left: 450px;
        border:1px solid white;
        img{
            align-items: center;
            width:3.5rem;
        }
    }
    .nameUser{
        margin-top:38px;
        display: flex;
        justify-content: center;
        align-items: center;
        h2{
            color:white;
            margin-right:10px;
        }
        img{
            cursor: pointer;
            width:2.5rem;
        }
        
    }
  }

  .user-bottom{
    display: flex;
    justify-content: center;
    align-items: center;
    .buttonChangePassword{
        img{
            width:1.8rem;
        }
        p{
            color:white;
        }
        display: flex;
        align-items: center;
        flex-direction: row;
        background-color: #9787EC;
        border-radius: 1rem;
        padding:7px 12px;
        justify-content: space-between;
        width:200px;
        cursor: pointer;
    }
  }

  .popupChangeUserName{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 0.5rem;
    width: 25%;
    height:25%;
    background-color: #ffffff;
    position: absolute;
    left:700px;
    top: 250px;
    padding:10px;
    visibility:hidden;
    .body{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        input{
            align-items: center;
            width: 90%;
            height:35px;
            background-color: transparent;
            padding: 0.8rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: #4e0eff;
            width: 100%;
            font-size: 1rem;
            &:focus {
              border: 0.1rem solid #997af0;
              outline: none;
            }
        }
    }
    .headerChangeUserName{
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
      .bodyChangeUserName{
        width: 100%;
        height:30%;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
    
        .buttonCancelPopupLogout{
            cursor: pointer;
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
  }
  .showPopupChangeUser {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
  }

  .popupChangePassword{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 0.5rem;
    width: 25%;
    height:45%;
    background-color: #ffffff;
    position: absolute;
    left:700px;
    top: 200px;
    padding:10px;
    visibility:hidden;
    .body{
        width: 100%;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        input{
            align-items: center;
            width: 90%;
            height:35px;
            background-color: transparent;
            padding: 0.8rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: #4e0eff;
            width: 100%;
            font-size: 1rem;
            &:focus {
              border: 0.1rem solid #997af0;
              outline: none;
            }
            margin-bottom:20px;
            margin-top:8px;
        }
    }
    .headerChangePassword{
        width: 100%;
        height:15%;
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
      .bodyChangePassword{
        width: 100%;
        height:25%;
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
  }
  .showPopupChangePassword {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
  }
`;
