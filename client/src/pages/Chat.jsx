import React, {useState, useEffect} from "react";
import io from "socket.io-client"
import Input from "../components/Input"
import UserList from "../components/UserList"
import Messages from "../components/Messages"
import {useLocation} from "react-router-dom"
import axios from "axios";
import {getRoomNameRoute, END_POINT} from "../api/api.path"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import jwt_decode from "jwt-decode"

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
    const local = JSON.parse(localStorage.getItem("token"))
    const decodedToken = jwt_decode(local.token)
    
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
        socket.emit('user__join', {room: roomId, name: decodedToken.username}, (error) => {
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
   
      <div className="bg-gradient-to-l from-black to-blue-600 w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-white text-3xl sm:text-5xl md:text-7xl lg:text-8xl mb-10 text-center">{currentRoomName}</h1>
        <div className="w-screen h-screen sm:w-10/12 sm:h-[500px] flex">
                <div className="overflow-y-scroll h-full w-3/12">
                  <UserList users={usersInRoom} />
                </div>
                <div className=" h-full w-11/12 ">
                    <div className="overflow-y-scroll h-[500px] bg-gray-900 pb-10">
                        <Messages messages={messages} />
                    </div>
                    <div className="-translate-y-full">
                        <Input messageInput={sendMessage} />
                    </div>
                </div>
        </div>
      </div>
        <ToastContainer />
    </>
    
  );
};

export default Chat;
