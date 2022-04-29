import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import jwt_decode from "jwt-decode"
import { toast } from "react-toastify";

const Navbar = () => {

  const navigate = useNavigate()
  const [toggle, setToggle] = useState(true)
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  
  const handleClick = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  useEffect(() => {

    const local = JSON.parse(localStorage.getItem('token'))

    if(local){
      const decodedToken = jwt_decode(local.token)
      const currentDate = new Date()
  
      if (decodedToken.exp * 1000 < currentDate.getTime()){
        localStorage.removeItem('token')
        navigate('/auth')
      }
    }
  }, [navigate])
  
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth)
    })
    if(windowSize >  767){
      setToggle(true)
    }
    if(windowSize <  767){
      setToggle(false)
    }
  }, [windowSize])

  return (<>
    <div className="flex md:hidden fixed top-0 right-0 bg-white z-50 text-3xl p-2" onClick={() => setToggle((_) => !_)}>X</div>
    { toggle && 
  (<div className="bg-black md:bg-opacity-5 w-screen md:flex justify-between fixed top-0 left-0" id="navbar">
    <div className="flex justify-around items-center w-3/3 md:w-2/3 md:flex-row  flex-col">
    <div className="nav-items"><Link to="/">Chat</Link></div>
    <div className="nav-items">
      <span>Products</span>
    </div>
    <div className="nav-items ">
      <a href="https://twitter.com/BardiNathan" target="_blank" rel="noreferrer">Twitter</a>
    </div>
    <div className="nav-items">
      <a href="https://github.com/Tekdey/real-time-chat" target="_blank" rel="noreferrer">Github</a>
    </div>
    </div>
    <div className="flex justify-around w-3/3 md:w-1/3 flex-col">
      {!localStorage.getItem('token') ? (
      <div className="flex justify-around">
          <Link to="/auth" className="nav-items">
            Login
          </Link>
      </div>
      ): (
        <div className="flex justify-center items-center md:justify-around flex-col md:flex-row">
          <div className="nav-items">
            <Link to="/" onClick={handleClick}>
              Disconnect
            </Link>
          </div>
          <div className="nav-items">
            <Link to="/account">
              ⚙
            </Link>
          </div>
        </div>
      )}
      
    </div>
  </div>)}</>
  )
};

export default Navbar;
