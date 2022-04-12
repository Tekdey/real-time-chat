import React from "react";
import "./Message.css"
import ReactEmoji from "react-emoji"

const Message = ({message}) => {

    // const localName = JSON.parse(localStorage.getItem('auth-user'))
    // if(localName){

    // }

  return (
    <div className="message__container">
        <p><span>{message.name}: </span>{message.text}</p>
    </div>
  )
};

export default Message;
