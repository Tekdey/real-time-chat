import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import "./JoinRoom.css"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {joinRoomRoute} from "../../../utils/APIRoutes"
import axios from "axios";


const INITIAL_STATE = {
  username: '' ,
  roomId: ''
}

const Join =  () => {
  const navigate = useNavigate()
    
    const [values, setValues] = useState(INITIAL_STATE)

    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(handleValidation()){

      const {roomId} = values

      const {data} = await axios.post(joinRoomRoute, {
        roomId,
      })
      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }
     if(data.status === true){
        navigate(`/chat/${data.room.roomId}`);
      }
    }

    
  }

  const handleValidation = () => {
    if(!values.roomId){
      toast.error('Room cannot be empty', toastOptions)
      return false
    }
    if(values.roomId.length > 100) {
      toast.error('Room name is 100 characters maximum', toastOptions)
      return false
    }
    if(values.username === '' || values.username === undefined){
      setValues({...values, username: 'Default' + Math.floor(Math.random() * 1000) })
      return false
    }
    return true
  }
  const handleChange = (e) => {
    setValues({...values,
      [e.target.name]: e.target.value
  })
  }   
  
  useEffect(() => {
    
      const userLocalStorage = JSON.parse(localStorage.getItem("auth-user"))
      setValues({...values, 
        username: userLocalStorage.username, 
        roomId: userLocalStorage.roomId
      })
  }, [])

  return  ( 
  <>
   <div className="room__join-container">
    <form
    onSubmit={handleSubmit}
    >
      <h1>Join</h1>
      <h3>{values.username}</h3>
    <div className="room__join-container-input_button">
        <input type="text" 
        placeholder="Room ID" 
        name="roomId"
        className="room__join-form-input__room"
        onChange={handleChange}
        />
        <button className="room__join-form-input__button">Join</button>
      </div>
    </form>
  </div>
  <ToastContainer />
 </>
)
};

export default Join;
