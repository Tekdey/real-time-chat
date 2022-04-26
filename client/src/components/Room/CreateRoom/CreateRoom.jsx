import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import "./CreateRoom.css"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
import {createRoomRoute} from "../../../api/api.path"
import {useDispatch} from "react-redux"


const INITIAL_STATE = {
  username: '' ,
  roomName: '',
}

const Join = () => {
  const dispatch = useDispatch()
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
      const {roomName} = values
      
      const {data} =  await axios.post(createRoomRoute, {
          roomName, 
      })
        dispatch({
          type: 'NEW__ROOM',
          payload: data.room.roomId
        })
        navigate(`/chat/${data.room.roomId}`)
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
      const userLocalStorage = JSON.parse(localStorage.getItem("auth-user"))
      setValues({...values, 
        username: userLocalStorage.username, 
        roomId: userLocalStorage.roomId
      })
  }, [])


  return  ( 
  <>
  <div className="room__create-container">
    <form
    onSubmit={handleSubmit}
    >
      <h1>Create</h1>
      <h3>{values.username}</h3>
      <div className="room__create-container-input_button">
        <input type="text" 
        placeholder="Room Name" 
        name="roomName"
        className="room__create-form-input__room"
        onChange={handleChange}
        />
      <button className="room__create-form-input__button">Create</button>
      </div>
    </form>
  </div>
  <ToastContainer />
 </>
)
};

export default Join;
