import React from "react";
import ReactEmoji from "react-emoji"
import jwt_decode from "jwt-decode"

const Message = ({message}) => {

    const local = JSON.parse(localStorage.getItem('token'))
    const decodedToken = jwt_decode(local.token)

    console.log(decodedToken);
  return (
    <div 
    className={
      message.users === "admin" ? "flex justify-center text-orange-600" :
      decodedToken.username === message.users ?
     " h-full w-full overflow-hidden flex flex-wrap justify-end" :
      " h-full w-full overflow-hidden flex flex-wrap justify-start" 
    }
    style={{
      borderBottom: message.users === "admin" && message.text.startsWith('Welcome') ? '1px solid white' : "",
      marginBottom: message.users === "admin" && message.text.startsWith('Welcome') ? '10px' : "",
    }}
      >
        <div>
          {
            message.users !== "admin" ? (
              <div 
              className="flex items-end"
              style={{
                flexDirection:  decodedToken.username === message.users ? 'row-reverse' : 'reverse'
              }}
              >
                <div className="bg-white rounded-full h-[50px] w-[50px]">
                </div>
                <div 
                className={
                  message.users === decodedToken.username ? ' max-w-[500px] min-w-[100px] h-full p-3 bg-blue-500 text-white' : 
                  message.users !== "admin" ? ' max-w-[500px] min-w-[100px] h-full p-3 bg-white text-black':
                  ' max-w-[500px] min-w-[100px] h-full p-3'
                }
                style={{
                  borderRadius: message.users === decodedToken.username ? '35px 35px 0 35px' : '35px 35px 35px 0'
                }}
                >
                  
                  <div className="flex flex-wrap overflow-hidden">
                    {ReactEmoji.emojify(message.text)}
                  </div>
                </div>
                <div className="flex flex-col h-full mx-[5px] text-blue-300">
                {
                  message.users === decodedToken.username ?(
                    `${message.date} ${message.users}`
                  ):(
                    `${message.users} ${message.date}`
                  )
                }
                </div>
              </div>
            ) : 
            (
                <div className="">
                  <div className="flex flex-wrap overflow-hidden">
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
