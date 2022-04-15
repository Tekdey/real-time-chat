import React, { useEffect, useState } from "react";
import "./Settings.css"
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"
import {updateRoomRoute} from "../../utils/APIRoutes"
import axios from "axios"


const local_values = JSON.parse(localStorage.getItem('auth-user'))

const INITIAL_STATE = {
  username: '',
  email: "",
  password: "",
  confirmPassword: "",
}



const Settings =  () => {

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [form, setForm] = useState(INITIAL_STATE)

  const handleValidation = () => {
    return true
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
  
      if(handleValidation()){
        const {username, email, password} = form
        const local_data = JSON.parse(localStorage.getItem('auth-user'))
          const {data} = await axios.post(updateRoomRoute, {
            username, email, password, local_data
          })
          if(data.status === false) {
            localStorage.setItem('auth-user', JSON.stringify({
              username: data.updateLocal.username,
              email: data.updateLocal.email
            }))
            toast.error(data.msg, toastOptions);
          }
          if(data.status === true) {
            localStorage.setItem('auth-user', JSON.stringify({
              username: data.username,
              email: data.email
            }))
            toast.error("Informations updated", toastOptions);
          }
      }
  }
 
    

  


  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
  }

  return (
    <div className="auth__form_register-container">
    <form onSubmit={handleSubmit}>
    <h1>Settings 🔧</h1>

        <div className="auth__form_register-container_fields">
            <label htmlFor="username">Username</label>
                <input type="text" 
                name="username" 
                placeholder={local_values.username}
                onChange={handleChange} 
                required />
        </div>

        <div className="auth__form_register-container_fields">
            <label htmlFor="email">Email</label>
            <input type="email" 
            name="email" 
            placeholder={local_values.email} 
            onChange={handleChange} 
            required />
        </div>
        <div className="auth__form_register-container_fields">
            <label htmlFor="password">Password</label>
            <input type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required />
        </div>
        <div className="auth__form_register-container_fields">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            onChange={handleChange} 
            required />
        </div>
        <div className="auth__form_register-container_fields-content_button">
            <button>
                Register
            </button>
            
            
        </div>
        <div className="auth__form_register-container_fields-content_sign">
        <p>
            Already have an account ?
            <span>
                <Link to="/login">
                 &nbsp;Login&nbsp; 
                </Link>
            </span>
            </p>
        </div>
    </form>
    <ToastContainer />
</div>
  )
};

export default Settings;
