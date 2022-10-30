import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import GroupChat from "../assets/GroupChat.png";
import CloseIcon from "../assets/CloseIcon.png";
import AvatarGroupChat from "../assets/avatarGroupChat.webp";
import { ToastContainer, toast } from "react-toastify";
import { createGroupChat } from "../utils/APIRoutes";
import { useNavigate, Link } from "react-router-dom";

export default function Contacts({ contactsGroup, contacts, changeChat, typeChat }) {
  const navigate = useNavigate();
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentUserId, setCurrentUserId] = useState(undefined);


  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
    setCurrentUserId(data._id);
  }, []);

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const changeCurrentChat = (index, contact,type) => {
    setCurrentSelected(index);
    changeChat(contact);
    typeChat(type);
    
  };

  const handlePopup = () => {
        var popup = document.getElementById("popup_info_group");
        popup.classList.toggle("show"); 
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    userCreate: "",
    nameGroup: "",
    listUser: new Set(),
  });
  const handleValidation = () => {
    const { nameGroup, listUser } = values;
    if (nameGroup.length < 1) {
      toast.error(
        "Chưa nhập tên nhóm!",
        toastOptions
      );
      return false;
    } else if (listUser.size < 1) {
      toast.error(
        "Chưa chọn thành viên nhóm!",
        toastOptions
      );
      return false;
    } else if (listUser.size < 2) {
      toast.error(
        "Thành viên nhóm phải từ 3 thành viên!",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleChangeNameGroup = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

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

  const handleSubmit = async (event) => {
    setValues({ ...values, userCreate:currentUserId });
    const {userCreate, nameGroup, listUser } = values;
    event.preventDefault();
    let arr = new Array();

    for (const value of listUser) {
      arr.push(value);
    }
    arr.push(userCreate);
    
    if (handleValidation()) {
      const { data } = await axios.post(createGroupChat, {
        userCreate,
        nameGroup,
        listUser:arr,
      });

      if (data.status === false) {
        toast.error(
          data.msg,
          toastOptions
        );
      }
      if (data.status === true) {
        navigate("/");
        window.location.reload();
  
      }
    }
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>overthink</h3>
          </div>
          <a className="chatGroup"
           onClick={() => console.log("chatGroup")}
           href="#popup_create_group"
          >
            <img src={GroupChat} alt="GroupChat" />
            <h5>Tạo nhóm</h5>
          </a>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    contact._id === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(contact._id, contact, "contact")}
                >
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
             {contactsGroup.map((contactGroup, index) => {
              return (
                <div
                  key={contactGroup._id}
                  className={`contact ${
                    contactGroup._id === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(contactGroup._id, contactGroup,"group")}
                >
                  <div className="avatar">
                  <img src={AvatarGroupChat} alt="AvatarGroupChat" />
                  </div>
                  <div className="username">
                    <h3>{contactGroup.nameGroup}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>

          <div className="popupMain" id="popup_create_group">
            <div className="popup">
              <div className="headerPopup">
                <h3>Tạo nhóm mới</h3>
                <a href="">
                 <img src={CloseIcon} alt="CloseIcon" />
                </a>
              </div>
              <form className="bodyPopup" action="" onSubmit={(event) => handleSubmit(event)}>
                <div className="viewInputNameGroup">
                  <img src={AvatarGroupChat} alt="AvatarGroupChat" />
                  <input
                    type="text"
                    placeholder="Nhập tên nhóm"
                    name="nameGroup"
                    onChange={(e) => handleChangeNameGroup(e)}
                    min="3"
                  />
                </div>
                <div className="listUser">
                  {contacts.map((contact, index) => {
                  return (
                    <div
                      key={contact._id}
                      className={`contact ${
                        index === currentSelected ? "selected" : ""
                      }`}
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
                <button className="submit-btn" type="submit" >
                  Tạo nhóm
                </button>
              </form>
            </div>
          </div>
          <ToastContainer />
        </Container>
        
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 6% 69% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .chatGroup {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    cursor: pointer;
    text-decoration: none;
    img {
      height: 1.5rem;
    }
    h5 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
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
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
    .popupMain:target{
      visibility: visible;
    }

    .popupMain{
      background-color:rgba(13,13,48,0.1)
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 100px;
      visibility:hidden;
      height: 100%;
    }
    .popup{
      display: flex;
      height: 500px;
      background-color:#ffffff;
      overflow: auto;
      gap: 0.8rem;
      align-items: center;
      flex-direction: column;
    }
    .headerPopup{
      height: 10%;
      width:100%;
      display: flex;
      flex-direction: row;
      align-items:center;
      grid-template-columns: auto auto;
      h3{
        width:90%;
        text-align: center;
        color: #0d0d30;
      }
      img {
        display: flex;
        height: 2rem;
        width: 2rem;
        max-inline-size: 100%;
        cursor: pointer;
        text-align: right;
      }
    }
    .bodyPopup{
      width:100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 90%;
    }
    .viewInputNameGroup{
      padding:0px 5px;
      height: 8%;
      width:100%;
      display: flex;
      flex-direction: row;
      align-items:center;
      grid-template-columns: auto auto;
      img{
        height: 1.8rem;
        width: 1.8rem;
      }
      input {
        
        margin-left:10px;
        height: 14px;
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

    .listUser{
      height:80%;
      width:100%;
      margin:5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: auto;
      gap: 0.8rem;
      input{
        height: 1.2rem;
        width: 1.2rem;
      }
      &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
          background-color: #ffffff39;
          width: 0.1rem;
          border-radius: 1rem;
        }
      }
      .contact {
        background-color: #ffffff34;
        min-height: 4rem;
        width: 90%;
        padding: 0.4rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        transition: 0.5s ease-in-out;
        border-bottom: 1px solid #0d0d30;
        .avatar {
          img {
            height: 2.5rem;
          }
        }
        .username {
          h3 {
            color: #0d0d30;
          }
        }
      }
      .selected {
        background-color: #9a86f3;
      }
    }

    .submit-btn {
      background-color: #4e0eff;
      color: white;
      padding: 0.5rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      align-item:center;
      &:hover {
        background-color: #4e0eff;
      }
    }
  
`;
