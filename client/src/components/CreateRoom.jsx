import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
import {createRoomRoute} from "../api/api.path"
import {useDispatch} from "react-redux"
import jwt_decode from "jwt-decode"

const INITIAL_STATE = {
  username: '' ,
  roomName: '',
}

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Create = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
    
    const [values, setValues] = useState(INITIAL_STATE)
    
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
      const local = JSON.parse(localStorage.getItem("token"))
      const decodedToken = jwt_decode(local.token)
      setValues({...values, 
        username: decodedToken.username, 
        // roomId: decodedToken.roomId
      })
      console.log(decodedToken);
  }, [])

  console.log(values);

  return  ( 
  <>
    <form
    onSubmit={handleSubmit}
    className="flex justify-center items-center flex-col bg-orange-400 rounded-lg p-3 mx-8"
    >
      <h1 className="text-white text-xl my-2">Create</h1>
      <h3 className="text-black text-md">{values.username}</h3>
        <input type="text" 
        placeholder="Room Name" 
        name="roomName"
        className="setting-input"
        onChange={handleChange}
        />
      <button className="bg-orange-900 p-3 rounded-lg text-white my-3">Create</button>
    </form>
  <ToastContainer />
 </>
)
};

export default Create;
