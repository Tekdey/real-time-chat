import React from "react";
import Navbar from "./Navbar/Navbar"
import "./Home.css"
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
