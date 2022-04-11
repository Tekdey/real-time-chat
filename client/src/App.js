import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import Chat from "./components/Chat/Chat";
import Room from "./components/Room/Room";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/room" element={<Room />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
