import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import GroupChat from "../assets/GroupChat.png";
import CloseIcon from "../assets/CloseIcon.png";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
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
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
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

              <div className="viewInputNameGroup">
                <img src={GroupChat} alt="GroupChat" />
                <input
                  type="text"
                  placeholder="Nhập tên nhóm"
                  name="nameGroup"
                  // onChange={(e) => handleChange(e)}
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
                    onClick={() => changeCurrentChat(index, contact)}
                  >
                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
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
              <button  className="submit-btn">
                 Tạo nhóm
              </button>
            </div>
          </div>
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
      visibility:visible;
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
        color: white;
        width: 100%;
        font-size: 1rem;
        &:focus {
          border: 0.1rem solid #997af0;
          outline: none;
        }
      }
    }

    .listUser{
      height: 70%;
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
        cursor: pointer;
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
