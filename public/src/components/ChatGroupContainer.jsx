import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {addMessageGroup ,addTV,getListAdd,getMessageGroup, leaveGroup,logoutRoute,deleteGroup, adminleaveGroup ,findListUserFromGroup} from "../utils/APIRoutes";
import AvatarGroupChat from "../assets/avatarGroupChat.webp";
import CloseIcon from "../assets/CloseIcon.png";
import Leave from "../assets/leave.png";
import Remove from "../assets/remove.png";
import ConfirmIcon from "../assets/confirm.png";
import CancelIcon from "../assets/CancelIcon.png";
import Warning from "../assets/warning.png";
import AddIcon from "../assets/AddIcon.png";
import RemovUser from "../assets/RemovUser.png";
import { useNavigate, Link } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";

export default function ChatGroupContainer({ currentChat, socket, contacts }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isUserCreateGroup, setIsUserCreateGroup] = useState(false);
  const [userCreateNew, setUserCreateNew] = useState(null);
  const [listUsers, setListUsers] = useState([]);
  const [msg, setMsg] = useState("");
  // const [contacts, setContacts] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentUserId, setCurrentUserId] = useState(undefined);
  const [values, setValues] = useState({
    listUser: new Set(),
  });
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserId(data._id);
  }, []);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(getMessageGroup, {
        usersend: data._id,
        group: currentChat._id,
    });
    setMessages(response.data);

    if(data._id == currentChat.userCreate){
      setIsUserCreateGroup(true);
    }else{
      setIsUserCreateGroup(false);
    }

    const listUser = await axios.post(findListUserFromGroup, {
      group: currentChat._id,
    });
    setListUsers(listUser.data);
    

    console.log("list user %d",listUsers.length );
    
    const listUserAdd = await axios.post(getListAdd, {
      group: currentChat._id,
  });
  setMessages(listUserAdd.data);

  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to:  data._id,
      from: data._id,
      msg,
      // avatarImage:data.avatarImage
    });
    await axios.post(addMessageGroup, {
      message: msg,
      usersend: data._id,
      group: currentChat._id,
      avatarImage:data.avatarImage
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg ,avatarImage:data.avatarImage});
    setMessages(msgs);
  };
  const handleSetImage = async (msg) => {
    setMsg(msg);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const closePopup = () =>{
    var popup = document.getElementById("popup_info_group");
    popup.classList.toggle("show"); 
  }

  const handlePopupConfirm = () =>{
    var popup = document.getElementById("popup-leave-group");
    popup.classList.toggle("showPopupConfirm"); 
    closePopup();
  }

  const leaveGroupChat = async() =>{
    console.log("leaveGroupChat");
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const { dataNew } = await axios.post(`${leaveGroup}/${currentChat._id}`, {
      userId: data._id,
    });

   window.location.reload();

  }

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

  const handlePopupConfirmDeleteGroup = () =>{
    var popup = document.getElementById("popup-confirm-delete");
    popup.classList.toggle("showPopupDelete"); 
    closePopup();
  }

  const handlePopupAddTV = () =>{
    var popup = document.getElementById("popup-confirm-add");
    popup.classList.toggle("showPopupAdd"); 
    closePopup();
  }

  const handleClickDelete = async() =>{
    console.log("deleteGroupChat");
    const { dataNew } = await axios.post(`${deleteGroup}/${currentChat._id}`);

   window.location.reload();

  }

  const adminleaveGroupChat = async() =>{
    console.log("adminLeaveGroupChat");
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const { dataNew } = await axios.post(`${adminleaveGroup}/${currentChat._id}`, {
      userId: data._id,
      userCreate: userCreateNew,
    });

   window.location.reload();

  }


  const handleAddListUser = (id) => {
    const { listUser } = values;
    let listUserChecked = new Set();
    listUserChecked =listUser;

    if(listUserChecked.has(id)){
      listUserChecked.delete(id);
    }else{
      listUserChecked.add(id);
    }
    setValues({ ...values, listUser:listUserChecked });
  };

  const handleClickAdd = async (event) => {
    const { listUser } = values;
    event.preventDefault();
    let arr = new Array();

    for (const value of listUser) {
      arr.push(value);
    }
    arr.push(currentUserId);
    
    if (handleClickAdd()) {
      const { data } = await axios.post(addTV, {
        listUser:arr,
      });
      if (data.status === true) {
        navigate("/");
        window.location.reload();
  
      }
    }
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details dropdown">
          <div class="user-info" data-toggle="dropdown" onClick={() => closePopup()}>
            <div className="avatar">
              <img
                src={AvatarGroupChat}
                alt="AvatarGroupChat"
              />
            </div>
            <div className="username">
              <h3>{currentChat.nameGroup}</h3>
            </div>
          </div>
          <div class="user-account-info dropdown-menu pull-right" id="popup_info_group">
              <ul class="us-links">
                  {
                    isUserCreateGroup && (<>
                    <li class="li_delete_group add-user-group" onClick={() => handlePopupAddTV()}>
                      <img  src={AddIcon} alt="Remove"/>
                      <a title="" onclick="popupThemThanhVien()">Thêm thành viên</a>
                    </li>
                    <li class="li_delete_group" onClick={() => handlePopupConfirmDeleteGroup()}>
                      <img  src={RemovUser} alt="Remove"/>
                      <a title="" onclick="popupXoaThanhVien()">Xoá thành viên</a>
                    </li>
                    <li class="li_delete_group" onClick={() => handlePopupConfirmDeleteGroup()}>
                      <img  src={Remove} alt="Remove"/>
                      <a title="" onclick="popupDoiMatKhau()">Xoá nhóm</a>
                    </li>
                    </> ) 
                  }
                    <li class="li_leave_group" onClick={() => handlePopupConfirm()}>
                      <img  src={Leave} alt="Leave"/>
                      <a title="">Rời nhóm</a>
                    </li>
              </ul>
          </div>
        </div>
        <div onClick={()=>handlePopupConfirmLogout()} className="buttonLogout">
          <BiPowerOff />
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
                {
                  message.fromSelf ? (  <div className="contentMessage">
                                          <div className="content ">
                                            <p>{message.message}</p>
                                          </div>
                                          <img
                                          className="imageContent"
                                            src={`data:image/svg+xml;base64,${message.avatarImage}`}
                                            alt=""
                                          />
                                        </div>)
                :(  <div className="contentMessageRe">
                      <img
                      className="imageContent"
                        src={`data:image/svg+xml;base64,${message.avatarImage}`}
                        alt=""
                      />
                      <div className="content ">
                        <p>{message.message}</p>
                      </div>
                    
                    </div>)
                }
              
              </div>
            </div>
          );
        })}
          <div className="message sended">
            <img className ="imgSend" src={msg} alt="" />
          </div>
      </div>
      <ChatInput handleSendMsg={handleSendMsg} setImage = {handleSetImage}/>
       {/* POPUP LEAVE GROUP */}
        
      {
        isUserCreateGroup ? 
        ( 
          <div className="popupConfirmAdminLeaveGroup" id="popup-leave-group">
            <div className="headerPopupAdminLeave">
                <h4>Rời nhóm và xoá toàn bộ tin nhắn?</h4>
              <div className="closePopupLeave" onClick={() => handlePopupConfirm()}>
                  <img
                    src={CloseIcon}
                    alt="CloseIcon"
                  />
              </div>
            </div>
            <div className="textHeaderPopupAdminLeave">
              <img
                  src={Warning}
                  alt="Warning"
                />
              <h5>Hãy chọn trưởng nhóm khác trước khi rời nhóm!</h5>
            </div>
            <div className="listPopupAdminLeave">
             
            </div>
            <div className="bodyPopupLeave">
                <div className="buttonCancelPopupLeave" onClick={() => leaveGroupChat()}>
                  <img
                      src={ConfirmIcon}
                      alt="ConfirmIcon"
                  />
                  <p>Xác nhận</p>
                </div>
                <div className="buttonCofirmPopupLeave" onClick={() => handlePopupConfirm()}>
                <img
                    src={CancelIcon}
                    alt="CancelIcon"
                  />
                  <p>Huỷ</p>
                </div>
            </div>
          </div>
        ) 
        :(
          <div className="popupConfirmLeaveGroup" id="popup-leave-group">
            <div className="headerPopupLeave">
                <h4>Rời nhóm và xoá toàn bộ tin nhắn?</h4>
                <div className="closePopupLeave" onClick={() => handlePopupConfirm()}>
                    <img
                      src={CloseIcon}
                      alt="CloseIcon"
                    />
                </div>
            </div>
            <div className="bodyPopupLeave">
              <div className="buttonCancelPopupLeave" onClick={() => leaveGroupChat()}>
                <img
                    src={ConfirmIcon}
                    alt="ConfirmIcon"
                />
                <p>Xác nhận</p>
              </div>
              <div className="buttonCofirmPopupLeave" onClick={() => handlePopupConfirm()}>
              <img
                  src={CancelIcon}
                  alt="CancelIcon"
                />
                <p>Huỷ</p>
              </div>
            </div>
          </div>
        )
      }
      
      {/* POPUP LOGOUT */}
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
      {/* POPUP DELETE GROUP */}
      <div className="popupConfirmLogout" id="popup-confirm-delete">
        <div className="headerPopupLogout">
          <h4>Bạn chắc chắn muốn xoá nhóm?</h4>
          <div className="closePopupLogout" onClick={() => handlePopupConfirmDeleteGroup()}>
              <img
                src={CloseIcon}
                alt="CloseIcon"
              />
          </div>
        </div>
        <div className="bodyPopupLogout">
            <div className="buttonCancelPopupLogout" onClick={() => handleClickDelete()}>
              <img
                  src={ConfirmIcon}
                  alt="ConfirmIcon"
              />
              <p>Xác nhận</p>
            </div>
            <div className="buttonCofirmPopupLogout" onClick={() => handlePopupConfirmDeleteGroup()}>
            <img
                src={CancelIcon}
                alt="CancelIcon"
              />
              <p>Huỷ</p>
            </div>
          </div>
      </div>

      {/* POPUP ADD GROUP */}
      <div className="popupConfirmAdd" id="popup-confirm-add">
        <div className="headerPopupLogout">
          <h4>Chọn thành viên muốn thêm?</h4>
          <div className="closePopupLogout" onClick={() => handlePopupAddTV()}>
              <img
                src={CloseIcon}
                alt="CloseIcon"
              />
          </div>
        </div>
       
        <div className="listPopupAdd">
        {contacts.map((contact, index) => {
                  return (
                    <div
                      key={contact._id}
                      className={`contact`}
                    >
                      <input type="checkbox" 
                        id="listUser" 
                        name="listUser" 
                        value={contact._id} 
                        onChange={(e) => handleAddListUser(contact._id)} ></input>
                      <div className="avatar">
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt=""
                        />
                      </div>
                      <div className="username">
                        <h3>{contact.username}</h3>
                      </div>
                    </div>
                    );
                  })}
                </div>
                <div className="bodyPopupLogout">
            <div className="buttonCancelPopupLogout" onClick={() => console.log()}>
              <img
                  src={ConfirmIcon}
                  alt="ConfirmIcon"
              />
              <p>Xác nhận</p>
            </div>
            <div className="buttonCofirmPopupLogout" onClick={() => handlePopupAddTV()}>
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
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    padding:20px;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      position: relative;
      .user-info{
        text-decoration: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 1rem;
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
    .user-details .show {
      visibility: visible;
      -webkit-animation: fadeIn 1s;
      animation: fadeIn 1s;
    }
    .user-account-info{
      width: 180px;
      background-color: #fff;
      position: absolute;
      left:10px;
      top: 3.5rem;
      border-radius: 0.2rem;
      padding:5px 10px;
      visibility:hidden;
      li{
        
        display: flex;
        align-items: center;
        height: 35px;
        cursor: pointer;
        img{
          width: 1.5rem;
          margin-right:10px;
        }
        a{
          color:red;
          text-decoration: none;
        }
      }
      .li_delete_group{
        border-bottom: 1px solid  #d1d1d1;
      }
      .add-user-group{
        a{
          color:green;
        }
      }
      .li_leave_group{
        a{
          color: orange
        }
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
      .contentMessage {
        max-width: 40%;
      }
      .contentMessageRe{
        max-width: 40%;
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
      .imgSend{
        width: 200px;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
    .contentMessage{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .content {
        max-width: 100%;
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
    .contentMessageRe{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .content {
        max-width: 100%;
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
    .imageContent{
      width: 2rem;
    }
  }
  .popupConfirmLeaveGroup{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 0.5rem;
    width: 25%;
    height:15%;
    background-color: #ffffff;
    position: absolute;
    left:600px;
    top: 200px;
    padding:10px;
    visibility:hidden;
  }
  .popupConfirmAdminLeaveGroup{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 0.5rem;
    width: 30%;
    height:40%;
    background-color: #ffffff;
    position: absolute;
    left:600px;
    top: 200px;
    padding:10px;
    visibility:hidden;
  }

  .headerPopupAdminLeave{
    width: 100%;
    height:10%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    h4{
      width: 100%;
      align-items: center;
      color: #0d0d30;
    }
    .closePopupLeave{
      display: flex;
      img{
        justify-content: flex-end;
      width: 2rem;
      }
    }
  }
  .textHeaderPopupAdminLeave{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height:12%;
    h5{
      color:red;
    }
    img{
      width: 1.6rem;
    }
  }
  .listPopupAdminLeave{
    height:58%;
  }

  .headerPopupLeave{
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
    .closePopupLeave{
      display: flex;
      img{
        justify-content: flex-end;
      width: 2rem;
      }
    }
  }
  .bodyPopupLeave{
    width: 100%;
    height:40%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    .buttonCancelPopupLeave{
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

    .buttonCofirmPopupLeave{
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
  .showPopupConfirm {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
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
  .showPopupDelete {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
  }

  .popupConfirmAdd{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    border-radius: 0.5rem;
    width: 25%;
    height:55%;
    background-color: #ffffff;
    position: absolute;
    left:700px;
    top: 200px;
    padding:10px;
    visibility:hidden;
  }
  .showPopupAdd {
    visibility: visible;
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
  }
  .listPopupAdd{

  }
  .bodyPopupAdd{
    width: 100%;
    height:20%;
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
    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      display: flex;
      flex-direction: row;
      align-items:center;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: black;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  
`;
