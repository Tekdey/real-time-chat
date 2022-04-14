import React from "react";
import './Content.css'
import {Link, useNavigate} from "react-router-dom"

const Content = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        if(localStorage.getItem('auth-user')){
            navigate('/room')
        }else{
            navigate('/register')
        }
    }

  return (
    <div className="content__container">
        <div className="content__container-typo">
            <div className="content__container-h1">
                <h1>Connect with your friends ! <span>😎</span></h1>
            </div>
            <div className="content__container-h3">
                <h3>Chat is a messaging for you and your friend, this app
                    will help you to connect with everyone in an easy and
                    confortable way, possible
                </h3>
            </div>
        </div>
        <div 
        className="content__container-button"
        onClick={handleClick}
        >
            <Link to="/room">
                Let's chat 😜
            </Link>
        </div>
    </div>
  )
};

export default Content;
