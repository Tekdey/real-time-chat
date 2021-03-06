import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from "./Message"

const Messages = ({messages}) => {

  return (
    <ScrollToBottom className="ROOT_CSS">
        {
          messages.map((msg, i)=> {
            return (
                <div key={i}>
                    <Message message={msg} /> 
                </div>
            )
          })
      }
    </ScrollToBottom>
  )
};

export default Messages;
