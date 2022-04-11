import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from "axios"
import { loginRoute } from "../../../utils/APIRoutes";
import "../Auth.css"
 
const INITIAL_STATE = {
    username: '',
    password: ''
}


const Auth = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState(INITIAL_STATE)
    
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

      useEffect(() => {
        if (localStorage.getItem("auth-user")) {
          navigate("/room");
        }
      }, [navigate]);

      const handleValidation = () => {
          /*////////////////// NOTIFY ///////////////////*/ 

        const {username, password} = formData

        if(username.length < 3){
            toast.error("username and password requiered", toastOptions);
            return false
        }
        if(!username){
            toast.error("username is required", toastOptions);
            return false
        }
        if(password.length < 5){
            toast.error("password needs 5 characters", toastOptions);
            return false
        }
        return true
      }


    const handleSubmit = async (e) => {

        e.preventDefault()

        /*////////////////// DATA ///////////////////*/ 

        if(handleValidation()){
            console.log("verified");

            const {username,  password} = formData

            const { data } = await axios.post(loginRoute, {
                username, 
                password
            })
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }
            if(data.status === true){
                localStorage.setItem("auth-user", JSON.stringify(data.user))
                navigate('/room')
            }
        }
    }
    const handleChange = (e) => {

        /*////////////////// SET FORM ///////////////////*/ 

        setFormData( {...formData,
            [e.target.name]: e.target.value
        })
    }


  return (
        <div className="auth__form-container">
            <form onSubmit={handleSubmit}>
            <h1>Login</h1>

                <div className="auth__form-container_fields">
                    <label htmlFor="username">Username</label>
                        <input type="text" 
                        name="username" 
                        placeholder="Username" 
                        onChange={handleChange} 
                        required />
                </div>
                <div className="auth__form-container_fields">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                    name="password" 
                    placeholder="Password" 
                    onChange={handleChange} 
                    required />
                </div>
                <div className="auth__form-container_fields-content_button">
                    <button>
                        Login
                    </button>
                    
                    
                </div>
                <div className="auth__form-container_fields-content_sign">
                <p>
                    'You don\'t have a account ? 
                    <span>
                        <Link to="/register">
                         &nbsp;Register&nbsp; 
                        </Link>
                    </span>
                    </p>
                </div>
            </form>
            <ToastContainer />
        </div>
  )
};

export default Auth;