import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Chat from "./components/Chat/Chat";
import Room from "./components/Room/Room";
import Redirect from "./components/Redirect";
import axios from "axios";
import { getAllRoomRoute } from "./api/api.path";
import Error from "./Error";
import { useSelector } from "react-redux";
import RoutesProtection from "./utils/Protected.routes.js";
import Home from "./components/Home/Home";
import Content from "./components/Home/Content/Content";
import Settings from "./components/Settings/Settings";
import DeleteAccount from "./components/Settings/DeleteAccount/DeleteAccount";

const App = () => {
  const [room, setRoom] = useState([]);

  const currentRoom = useSelector((state) => state.allRoom);

  useEffect(() => {
    axios.get(getAllRoomRoute).then(({ data }) => {
      setRoom(data.rooms);
    });
  }, [currentRoom]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          {/*////////////////// Sign ///////////////////*/}
          <Route path="/" element={<Content />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/*////////////////// Protected Routes ///////////////////*/}
          <Route element={<RoutesProtection />}>
            <Route path="/room" element={<Room />} />
            <Route path="/chat" element={<Redirect />} />
            <Route path="/account" element={<Settings />} />
            <Route path="/account/delete" element={<DeleteAccount />} />
            <Route path="*" element={<Error />} />

            {room.map((route, i) => {
              return (
                <Route key={i} path={`/chat/${route}`} element={<Chat />} />
              );
            })}
          </Route>
          {/*///////////////////////////////////////////////////////*/}
        </Route>
      </Routes>
    </>
  );
};

export default App;
