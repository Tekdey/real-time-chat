import React from "react";
import 'react-toastify/dist/ReactToastify.css'
import CreateRoom from "./CreateRoom/CreateRoom"
import JoinRoom from "./JoinRoom/JoinRoom"
import "./Room.css"




const Join = () => {

    // Todo

  return  ( 
  <>
    <div className="room__container">
      <CreateRoom />
      <div className="room__container-title">Room</div>
      <div className="room__container-fence_horizontal"></div>
      <div className="room__container-fence_vertical"></div>
      <JoinRoom />
    </div>
  </>
)
};

export default Join;
