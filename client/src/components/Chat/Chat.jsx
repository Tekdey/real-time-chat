import React, {useState, useEffect} from "react";
import io from "socket.io-client"
import Input from "./Input/Input"
import UserList from "./UserList/UserList"
import Messages from "./Messages/Messages"
import "./Chat.css"
import {useLocation} from "react-router-dom"
import axios from "axios";
import {getRoomNameRoute, END_POINT} from "../../api/api.path"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

let socket;

const Chat = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
    const location = useLocation()

    const [currentRoomName, setCurrentRoomName] = useState('')
    const [usersInRoom, setUsersInRoom] = useState([])
    const [messages, setMessages] = useState([])

    const roomId = location.pathname.replace('/chat/', '')
    const userName = JSON.parse(localStorage.getItem('auth-user'))
    
    /*////////////////// Get room name ///////////////////*/ 
    useEffect(() => {
      async function getRoomName(roomId){
        const {data} = await axios.post(getRoomNameRoute, {
           currentRoomId: roomId,
        })
        setCurrentRoomName(data.currentRoomName);
      }
      getRoomName(roomId)
    })
    
    
    /*////////////////// JOIN AND DISCONNECT ///////////////////*/ 
    

    useEffect(() => {
      socket = io(END_POINT)  
        socket.emit('user__join', {room: roomId, name: userName.username}, (error) => {
            console.log(error);
        })
     
        return () => {
          socket.disconnect()

          socket.off()
        }
       
    }, [END_POINT, location])

      /*////////////////// MESSAGES ///////////////////*/ 

    useEffect(() => {

      // Room data
      socket.on('room__data', ({room, users}) => {
        // Todo add chat name
        setUsersInRoom(users)
      })

      
      // User joined ADMIN
      socket.on('admin__general-message', (content) => {
        setMessages((messages) => [...messages, content])
      }) 

      // User messages
      socket.on('user__message', (content) => {
        setMessages((messages) => [...messages, content])
      })
     
    }, [])
    const sendMessage = (e, inputUserMessage) => {
      e.preventDefault()

      if(inputUserMessage){
        socket.emit('sendMessage', inputUserMessage)
      }

    } 

    /*////////////////// Errors ///////////////////*/ 

    useEffect(() => {
      socket.on("transport__close-error", ({error}) => {
        toast.error(error, toastOptions)
      } )
    }, [])

  return (
    <>
   
      <div className="chat__outer-container">
      <h1>{currentRoomName}</h1>
        <div className="chat__inset-container">
            <div className="chat__container">
                <div className="chat__container-user__list">
                  <UserList users={usersInRoom} />
                </div>
                <div className="chat__container-main__container">
                    <div className="chat__container-messages">
                        <Messages messages={messages} />
                    </div>
                    <div className="chat__container-messages__input">
                        <Input messageInput={sendMessage} />
                    </div>
                </div>
            </div>
        </div>
      </div>
        <ToastContainer />
    </>
    
  );
};

export default Chat;
