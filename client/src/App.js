import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import Room from "./pages/Room";
import Redirect from "./components/Redirect";
import axios from "axios";
import { getAllRoomRoute } from "./api/api.path";
import Error from "./Error";
import { useSelector } from "react-redux";
import RoutesProtection from "./utils/Protected.routes.js";
import Home from "./pages/Home";
import Content from "./components/Content";
import Settings from "./pages/Settings";
import DeleteAccount from "./components/DeleteAccount";

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
          <Route path="/auth" element={<Auth />} />
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
