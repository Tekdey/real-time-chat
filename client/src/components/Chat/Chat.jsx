import React, {useState, useEffect} from "react";
import io from "socket.io-client"
import queryString from 'query-string'
import Input from "./Input/Input"
import UserList from "./UserList/UserList"
import Messages from "./Messages/Messages"
import "./Chat.css"

let socket;

const Chat = () => {

    const [usersInRoom, setUsersInRoom] = useState([])
    const [messages, setMessages] = useState([])
    const END_POINT = 'localhost:5000'

    const {roomId} = queryString.parse(window.location.search);
    const userName = JSON.parse(localStorage.getItem('auth-user'))

    /*////////////////// JOIN AND DISCONNECT ///////////////////*/ 
    
    useEffect(() => {
      socket = io(END_POINT)  
      socket.emit('user__join', {room: roomId, name: userName.username})
        return () => {
          socket.emit('disconnect');

          socket.off()
        }
    }, [END_POINT, window.location.search])

      /*////////////////// MESSAGES ///////////////////*/ 

    useEffect(() => {

      // Room data
      socket.on('room__data', ({users}) => {
        setUsersInRoom(users)
      })

      
      // User joined ADMIN
      socket.on('admin__general-message', (content) => {
        console.log(content);
        setMessages(messages => [...messages, content])
      }) 

      // User messages
      socket.on('user__message', (content) => {
        console.log(content);
        setMessages((messages) => [...messages, content])
      })
     
    }, [])

    console.log(messages);
    const sendMessage = (e, inputUserMessage) => {
      e.preventDefault()

      if(inputUserMessage){
        socket.emit('sendMessage', inputUserMessage)
      }

    } 

  return (
    <div className="chat__outer-container">
    <div className="chat__container">
        <UserList users={usersInRoom} />
        <Input messageInput={sendMessage} />
        <Messages messages={messages} />
    </div>
  </div>
  );
};

export default Chat;
