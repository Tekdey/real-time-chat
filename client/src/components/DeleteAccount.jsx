import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {deleteAccountRoute} from "../api/api.path"
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
      <div className="bg-blue-800 rounded-lg p-5 flex justify-center items-center flex-col text-white">
          {
              confirmation && (
                <span 
                className="self-start"
                > <Link to="/account"> &larr; Go back back</Link></span>
              )
          }
          <div className="">
              <span className="text-2xl">
                  {confirmation ? "Confirm your password" : 
                    "Do you want delete your account ?"
                  }
              </span>
          </div>
          <div className="flex justify-around w-full mt-5">
              {
                  !confirmation ?(
              <>
                <button className="bg-green-800 px-5 py-3 rounded-md"
                    onClick={() => setConfirmation((_) => !_)}
                >YES</button>
                <Link to="/account">
                    <button className="bg-red-800 px-5 py-3 rounded-md">NO</button>
                </Link>
              </>
              ): 
              (
                  <div className="flex justify-center flex-col items-center w-full">
                        <input 
                        type="password"
                        placeholder="Your password"
                        className="setting-input"
                        onChange={handleChange}
                        />
                        <button 
                        className="bg-red-800 px-5 py-2 rounded-md mt-2"
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
