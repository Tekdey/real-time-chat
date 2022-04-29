import React from "react";
import 'react-toastify/dist/ReactToastify.css'
import CreateRoom from "../components/CreateRoom"
import JoinRoom from "../components/JoinRoom"




const Join = () => {

    // Todo

  return  ( 
  <>
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-white text-3xl sm:text-5xl md:text-7xl lg:text-8xl mb-10 text-center uppercase">Rooms</h1>
      <div className="flex flex-col sm:flex-row">
      <CreateRoom />
      <JoinRoom />
      </div>
    </div>
  </>
)
};

export default Join;
