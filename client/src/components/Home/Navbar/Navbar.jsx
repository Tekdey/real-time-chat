import React from "react";
import './Navbar.css'
import {Link} from "react-router-dom"

const Navbar = () => {
  
  const handleClick = () => {
    localStorage.removeItem('auth-user')
    window.location.reload()
  }
  return (
  <div className="navbar__container">
    <div className="navbar__container-items">
        <div className="item">
          <Link to="/">
            Chat
          </Link>
        </div>
        <div className="item">Products</div>
        <div className="item">
          <a href="https://twitter.com/Tekdey" target="_blank">
            Twitter
          </a>
        </div>
        <div className="item">
          <a href="https://github.com/Tekdey/real-time-chat" target="_blank">
            Github
          </a>
        </div>
    </div>
    <div className="navbar__container-account_settings">
      {!localStorage.getItem('auth-user') ? (
      <>
        <div className="item sign-btn">
          <Link to="/login">
            Sign in
          </Link>
        </div>
        <div className="item sign-btn">
          <Link to="/register">
            Sign up
         </Link>
        </div>
      </>
      ): (
        <>
        <div 
        className="item sign-btn"
          onClick={handleClick}
        >
          <Link to="/">
            Disconnect
          </Link>
        </div>
        <div 
        className="item settings-btn"
        >
          <Link to="/settings">
            ⚙
          </Link>
        </div>
        </>
      )}
      
    </div>
  </div>
  )
};

export default Navbar;
