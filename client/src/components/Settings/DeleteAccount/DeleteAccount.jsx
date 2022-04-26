import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DeleteAccount.css"
import {deleteAccountRoute} from "../../../api/api.path"
import axios from 'axios'
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const DeleteAccount = () => {

    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState(false)
    
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

    
    const handleChange = (e) => {
        setPassword(e.target.value)
    }
    const handleValidation = () => {
        if(password.length < 5){
            toast.error("password needs 5 characters", toastOptions);
            return false
        }
        return true
    }

    const deleteAccount = async () => {
        if(handleValidation()){
            if(localStorage.getItem('auth-user')){
                const local_data = JSON.parse(localStorage.getItem('auth-user'))
    
                const {data} = await axios.post(deleteAccountRoute, {
                    password,
                    local_data
                })
                if(data.status === false){
                    if(data.msg === 'Error, please try later'){
                        window.location.reload()
                    }
                    toast.error(data.msg, toastOptions)
                }
                if(data.status === true){
                    toast.error(data.msg, toastOptions)
                    localStorage.removeItem('auth-user')
                    window.location.reload()
                }
            }
        }
    }


  return (
      <div className="delete__account-container">
          {
              confirmation && (
                <span 
                className="delete__account-container-span_back"
                > <Link to="/account"> &larr; Go back back</Link></span>
              )
          }
          <div className="delete__account-span">
              <span>
                  {confirmation ? "Confirm your password" : 
                    "Do you want delete your account ?"
                  }
              </span>
          </div>
          <div className="delete__container-confirmation">
              {
                  !confirmation ?(
              <>
                <button className="YES"
                    onClick={() => setConfirmation((_) => !_)}
                >YES</button>
                <Link to="/account">
                    <button className="NO">NO</button>
                </Link>
              </>
              ): 
              (
                  <div className="delete__container-confirmation-input_confirm_password-Container">
                        <input 
                        type="password"
                        placeholder="Your password"
                        className="delete__container-confirmation-input_confirm_password"
                        onChange={handleChange}
                        />
                        <button 
                        className="delete__container-confirmation-input_confirm_password-btn"
                        onClick={deleteAccount}
                        >DELETE</button>
                  </div>
              )
            }
         </div>
         <ToastContainer />
      </div>
  )
};

export default DeleteAccount;
