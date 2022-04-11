import React from "react";
import 'react-toastify/dist/ReactToastify.css'
import CreateRoom from "./CreateRoom/CreateRoom"
import JoinRoom from "./JoinRoom/JoinRoom"
import "./Room.css"




const Join = () => {
  
  return  ( 
  <>
  <div className="room_container">
    <CreateRoom />
    <JoinRoom />
  </div>
   </>
)
};

export default Join;
