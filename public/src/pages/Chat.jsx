import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host, getGroupChat } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import ChatGroupContainer from "../components/ChatGroupContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Profile from "../components/Profile";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [contactsGroup, setContactsGroup] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentTypeChat, setCurrentTypeChat] = useState(undefined);
  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  // useEffect(() => {
  //   if (contactsGroup) {
  //     socket.current = io(host);
  //     socket.current.emit("add-group", contactsGroup._id);
  //   }
  // }, [contactsGroup]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  useEffect(async () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${getGroupChat}/${currentUser._id}`);
        setContactsGroup(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const handleTypeChatChange = (chat) => {
    setCurrentTypeChat(chat);
  };
  
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contactsGroup={contactsGroup} contacts={contacts} changeChat={handleChatChange} typeChat={handleTypeChatChange}/>
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            currentTypeChat === "group" ? (<ChatGroupContainer currentChat={currentChat} socket={socket} contacts={contacts}/>)
            :(currentTypeChat === "profile" ? <Profile/> 
            :<ChatContainer currentChat={currentChat} socket={socket} />)

          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
