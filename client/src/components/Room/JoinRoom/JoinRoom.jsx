import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import "./JoinRoom.css"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'


const INITIAL_STATE = {
  username: '' ,
  room: '',
  roomId: ''
}

const Join = () => {
  const navigate = useNavigate()
    
    const [values, setValues] = useState(INITIAL_STATE)

    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!values.room){
      toast.error('Room cannot be empty', toastOptions)
    }else if(values.room.length < 3) {
      toast.error('Room name is 3 characters minimum', toastOptions)
    }
    else if(values.room.length > 20) {
      toast.error('Room name is 20 characters maximum', toastOptions)
    }else if(values.username === '' || values.username === undefined){
      setValues({...values, username: 'Default' + Math.floor(Math.random() * 1000) })
    }
    else{
      navigate(`/chat?roomId=${values.roomId}&room=${values.room}`);
    }

  }
  const handleChange = (e) => {
    setValues({...values,
      [e.target.name]: e.target.value
  })
  } 

  useEffect(() => {

    if(!localStorage.getItem("auth-user")){
      navigate('/login')
    }else{
      const userLocalStorage = JSON.parse(localStorage.getItem("auth-user"))
      setValues({...values, 
        username: userLocalStorage.username, 
        roomId: userLocalStorage.roomId
      })
    }
  }, [INITIAL_STATE])


  return  ( 
  <>
   <div className="room__join-container">
    <h1>Join</h1>
    <form
    onSubmit={handleSubmit}
    >
      <h3>{values.username}</h3>
      <input type="text" 
      placeholder="Room" 
      name="room"
      className="room__join-form-input__room"
      onChange={handleChange}
      />
      <button className="room__join-form-input__button">Join</button>
    </form>
  </div>
  <ToastContainer />
 </>
)
};

export default Join;
