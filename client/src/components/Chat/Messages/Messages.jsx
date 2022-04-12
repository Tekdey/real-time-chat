import React from "react";
import "./Messages.css"
import ScrollBottom from "react-scroll-to-bottom"
import Message from "./Message/Message"

const Messages = ({messages}) => {
  return (
    <ScrollBottom>
        {
          messages.map((msg, i)=> {
              console.log(msg);
            return (
                <div key={i}>
                    <Message message={msg} /> 
                </div>
            )
          })
      }
    </ScrollBottom>
  )
};

export default Messages;
