import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";

export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
       <div className="chat-header">
        <Logout />
      </div>
      <div className="body">
        <img src={Robot} alt="" />
        <h1>
          Welcome, <span>{userName}!</span>
        </h1>
        <h3>Please select a chat to Start messaging.</h3>
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
`;
