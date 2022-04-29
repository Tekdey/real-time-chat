import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {joinRoomRoute} from "../api/api.path"
import axios from "axios";
import jwt_decode from "jwt-decode"


const INITIAL_STATE = {
  username: '' ,
  roomId: ''
}

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const Join =  () => {
  const navigate = useNavigate()
    
    const [values, setValues] = useState(INITIAL_STATE)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(handleValidation()){

      const {roomId} = values

      const {data} = await axios.post(joinRoomRoute, {
        roomId,
      })
      console.log(data);
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
    
      const local = JSON.parse(localStorage.getItem("token"))
      const decodedToken = jwt_decode(local.token)

      setValues({...values, 
        username: decodedToken.username, 
        // roomId: userLocalStorage.roomId
      })
  }, [])

  return  ( 
  <>
    <form
    onSubmit={handleSubmit}
    className="flex justify-center items-center flex-col bg-orange-400 rounded-lg p-3 mx-8  my-8 sm:my-0"
    >
      <h1 className="text-white text-xl my-2">Join</h1>
      <h3 className="text-black text-md">{values.username}</h3>
        <input type="text" 
        placeholder="Room ID" 
        name="roomId"
        className="setting-input"
        onChange={handleChange}
        />
        <button className="bg-orange-900 p-3 rounded-lg text-white my-3">Join</button>
    </form>
  <ToastContainer />
 </>
)
};

export default Join;
