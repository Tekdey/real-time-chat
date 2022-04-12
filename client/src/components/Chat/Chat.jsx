import React, {useState, useEffect} from "react";
import io from "socket.io-client"
import queryString from 'query-string'

let socket;

const Chat = () => {

    const [usersInRoom, setUsersInRoom] = useState([
      'Bot'
    ])
    const [inputUserMessage, setInputUserMessage] = useState('')
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

      // User joined
      socket.on('admin__general-message', ({text}) => {
        setMessages(messages => [...messages, text])
      }) 

      socket.on('user__message', ({message, name}) => {
        setMessages((messages) => [...messages, `${name} a dit : ${message}`])
      })
     
     

     
    }, [])
    
    const sendMessage = (event) => {
      event.preventDefault()

      if(inputUserMessage){
        socket.emit('sendMessage', inputUserMessage)
        setInputUserMessage('')
      }

    }

  return (
    <div className="outerContainer">
    <div className="container">
      {
        usersInRoom.map((users, i)=> {
          return (
            <p key={i}>{users}</p>
          )
        })
      }
        <input 
        onChange={(event) => setInputUserMessage(event.target.value)} 
        onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
        value={inputUserMessage}
        />

      {
          messages.map((msg, i)=> {
            return (
              <p key={i}>{msg}</p>
            )
          })
      }
    </div>
  </div>
  );
};

export default Chat;
