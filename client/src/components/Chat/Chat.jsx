import React, {useState, useEffect} from "react";
import io from "socket.io-client"
import queryString from 'query-string'

let socket;

const Chat = ({location}) => {

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const END_POINT = 'localhost:5000'

    useEffect(() => {
        const {name, room} = queryString.parse(window.location.search);

        socket = io(END_POINT)

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room}, () => {
          //
        });

        return () => {
          socket.emit('disconnect');

          socket.off()
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [END_POINT, window.location.search])

    useEffect(() => {
      socket.on('message', (message) => {
        setMessages([...messages, message])
      })
    }, [message])
    
    const sendMessage = (event) => {
      event.preventDefault()

      if(message){
        socket.emit('sendMessage', message, () => setMessage(''))
      }

    }

    console.log(message, messages);

  return (
    <div className="outerContainer">
    <div className="container">
        <input value={message} onChange={(event) => setMessage(event.target.value)} 
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
    </div>
  </div>
  );
};

export default Chat;
