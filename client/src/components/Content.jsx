import React from "react";
import {Link, useNavigate} from "react-router-dom"
import jwt_decode from "jwt-decode"

const Content = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        const local = JSON.parse(localStorage.getItem('token'))

        if(local){
        const decodedToken = jwt_decode(local.token)
        const currentDate = new Date()
            console.log('local');
            console.log(decodedToken);

        if (decodedToken.exp * 1000 < currentDate.getTime()){
            console.log('perimé');
            localStorage.removeItem('token')
            navigate('/auth')
        }else{
            console.log('room');
            navigate('/room')
        }
        }else{
            console.log('rien');
            navigate('/auth')
        }
    }

  return (
    <div className="flex justify-center flex-col items-center">
        <div className="flex justify-center flex-col items-center">
                <h1 className="text-white text-3xl sm:text-5xl md:text-7xl lg:text-8xl mb-10 text-center">Connect <br /> with your friends ! <span>😎</span></h1>
                <h3 className="text-white text-xl text-center w-2/3">Chat is a messaging for you and your friend, this app
                    will help you to connect with everyone in an easy and
                    confortable way, possible
                </h3>
        </div>
        <div 
        className="bg-blue-800 p-5 text-white text-3xl rounded-lg m-5"
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
