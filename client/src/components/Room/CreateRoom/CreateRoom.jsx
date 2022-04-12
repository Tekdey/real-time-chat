import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import "./CreateRoom.css"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
import {createRoomRoute} from "../../../utils/APIRoutes"


const INITIAL_STATE = {
  username: '' ,
  roomName: '',
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(handleValidation()){
      console.log('verified room');
      const {roomName} = values
      
      const {data} =  await axios.post(createRoomRoute, {
          roomName, 
      })
      navigate(`/chat?roomId=${data.room._id}`);
    }
    
  }
  const handleValidation = () => {

    if(!values.roomName){
      toast.error('Room cannot be empty', toastOptions)
      return false
    }
    if(values.roomName.length < 3) {
      toast.error('Room name is 3 characters minimum', toastOptions)
      return false
    }
    if(values.roomName.length > 20) {
      toast.error('Room name is 20 characters maximum', toastOptions)
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

    if(!localStorage.getItem("auth-user")){
      navigate('/login')
    }else{
      const userLocalStorage = JSON.parse(localStorage.getItem("auth-user"))
      setValues({...values, 
        username: userLocalStorage.username, 
        roomId: userLocalStorage.roomId
      })
    }
  }, [navigate, values])


  return  ( 
  <>
  <div className="room__create-container">
    <h1>Create</h1>
    <form
    onSubmit={handleSubmit}
    >
      <h3>{values.username}</h3>
      <input type="text" 
      placeholder="Room Name" 
      name="roomName"
      className="room__create-form-input__room"
      onChange={handleChange}
      />
      <button className="room__create-form-input__button">Create</button>
    </form>
  </div>
  <ToastContainer />
 </>
)
};

export default Join;
