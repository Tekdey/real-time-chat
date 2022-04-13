import React from "react";
import "./Message.css"
import ReactEmoji from "react-emoji"

const Message = ({message}) => {

    const localName = JSON.parse(localStorage.getItem('auth-user'))
    console.log(message.users === true);
    console.log(message.text);
    

  return (
    <div 
    className={
      message.users === "admin" ? "container__messages-individual_admin" :
      localName.username === message.users ?
     "container__messages-individual_sender" :
      "container__messages-individual_all-user" 
    }
    style={{
      borderBottom: message.users === "admin" && message.text.startsWith('Welcome') ? '1px solid white' : "",
      marginBottom: message.users === "admin" && message.text.startsWith('Welcome') ? '10px' : "",
    }}
      >
        <div className="container__message-user">
          {
            message.users !== "admin" ? (
              
              <div 
              className="container__message-user_info"
              style={{
                flexDirection:  localName.username === message.users ? 'row-reverse' : 'reverse'
              }}
              >
                
                <div className="container__message-user_picture">
                </div>
                
                <div 
                className={
                  message.users === localName.username ? 'container__message-user_name-message_sender' : 
                  message.users !== "admin" ? 'container__message-user_name-message_all-user':
                  'container__message-user_name-message_admin'
                }
                style={{
                  borderRadius: message.users === localName.username ? '35px 35px 0 35px' : '35px 35px 35px 0'
                }}
                >
                  
                  <div className="container__message-user_name"
                    style={{
                      justifyContent: message.users === localName.username ? "flex-end" : "flex-start"
                    }}
                  >
                    {message.users === localName.username ? 'You' : message.users}
                  </div>

                  <div className="container__message-user_text">
                    {ReactEmoji.emojify(message.text)}
                  </div>

                </div>
                

              </div>
              
            ) : 
            (
                <div className="container__message-user_name-message">
                  <div className="container__message-user_text">
                    {message.text}
                  </div>
                </div>
            )
          }
          
        </div>
        
    </div>
  )
};

export default Message;
