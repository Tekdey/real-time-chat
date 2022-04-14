import React from "react";
import Navbar from "./Navbar/Navbar"
import Content from "./Content/Content"
import "./Home.css"
import Login from "../Auth/Login/Login"
import Register from "../Auth/Register/Register"
import { Outlet} from "react-router-dom";

const Home = () => {
  return (
      <>
        <Navbar />
        <div className="home__container">
            <Outlet />
        </div>
      </>
  )
};

export default Home;
