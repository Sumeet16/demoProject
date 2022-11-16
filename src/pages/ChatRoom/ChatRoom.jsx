import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ChatRoom.css";
import { uid } from "uid";
import moment from 'moment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyBTPfNjWHZRcw3TvwfbMHAdhTEZLTVpviQ",
  authDomain: "storagedemo-c3d2d.firebaseapp.com",
  databaseURL: "https://storagedemo-c3d2d-default-rtdb.firebaseio.com",
  projectId: "storagedemo-c3d2d",
  storageBucket: "storagedemo-c3d2d.appspot.com",
  messagingSenderId: "885128275945",
  appId: "1:885128275945:web:dbb4b15829dd3b84d50d78"
})

const firestore = firebase.firestore();

const ChatRoom = () => {
  const [chatInput, setchatInput] = useState("");
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get('id');
  let username;
  const dummy = useRef();
  const messagesRef = firestore.collection(id);
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, { idField: 'id' });
  const element = document.getElementById("scrollToBottomDiv");
  let i


  username = queryParams.get('userName');
  if (username === "Admin") {
    i = username
  } else {
    i = localStorage.getItem("userName");
  }

  const handleChange = (e) => {
    setchatInput(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const u = uid();
    const m = moment().format('lll');

    await messagesRef.add({
      t: chatInput,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      u,
      i,
      m
    })

    setchatInput("")
    window.scrollTo(top)
  }


  return (
    <>
      <Header color="black" />
      <div className="chat_container">
        <div className="chat_response_container" id="scrollToBottomDiv">
          {messages ?
              [...messages]
              .reverse()
              .map((elem, index) => {
                return (
                  <>
                    {i === elem.i ? <>
                      <div className="individual_chat_container send">
                        <div className="person_image">{(elem.i).charAt(0)}</div>
                        <div className="inner_chat_cont">
                          <div className="chat_text"><p>{elem.t}</p></div>
                          <div className="row_cont"><div className="chat_time">{elem.m}</div><div className="chat_user_tag">@{elem.i}</div></div>
                        </div>
                      </div>
                    </> : <>
                      <div className="individual_chat_container">
                        <div className="person_image">{(elem.i).charAt(0)}</div>
                        <div className="inner_chat_cont">
                          <div className="chat_text"><p>{elem.t}</p></div>
                          <div className="row_cont"><div className="chat_time">{elem.m}</div><div className="chat_user_tag">@{elem.i}</div></div>
                        </div>
                      </div>
                    </>}
                  </>
                )
              }) : <div className="center">LOADING MESSAGES</div>}
        </div>
        <div className="input_chat_app">
          <input type="text" name="chat-input" id="chat-input" autoComplete="off" onChange={handleChange} value={chatInput} placeholder="Add your message" />
          <button className="send_button" disabled={!chatInput} onClick={sendMessage}><span>Send</span> <p></p></button>
        </div>
      </div>
      <Footer />
    </>
  )
}



export default ChatRoom