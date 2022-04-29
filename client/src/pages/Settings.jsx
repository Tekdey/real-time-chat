import React, {  useState } from "react";
import { Link } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {updateAccountRoute, updatePasswordRoute} from "../api/api.path"
import axios from "axios"


const local_values = JSON.parse(localStorage.getItem('auth-user'))

const INITIAL_STATE = {
  username: '',
  email: "",
  password: "",
  confirmPassword: "",
  newPassword: ""
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
  const [changePassword, setChangePassword] = useState(false)
  console.log(changePassword);
  const handleValidation = () => {

    if(changePassword){
      const {password, confirmPassword, newPassword} = form

      if(password !== confirmPassword){
        toast.error('Your password isn\'t identic', toastOptions)
        return false
      }
      if(password === newPassword){
        toast.error('Your new password needs to be different than the current !', toastOptions)
        return false
      }
      if(password.length < 5){
        toast.error("Password needs minimum 5 characters", toastOptions);
        return false
      }
    }
    return true
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const local_data = JSON.parse(localStorage.getItem('auth-user'))

    if(handleValidation()){

      if(changePassword){
        // Change password

        const { password, newPassword } = form
        const {data} = await axios.post(updatePasswordRoute, {
          password,
          newPassword,
          local_data
        })

        if(data.status === false){
          toast.error(data.msg, toastOptions)
        }
        if(data.status === true){
          toast.error(data.msg, toastOptions)
          setChangePassword(false)
        }
      }
      if(!changePassword){
        // Change info user

        const {username, email, password} = form
          const {data} = await axios.post(updateAccountRoute, {
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
  }
 
  


  const handleChange = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
  }

  return (
    <div className="flex flex-col justify-center items-center text-white">
    <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-blue-800 rounded-lg shadow-xl p-5">
    <h1 className="p-5 text-3xl font-bold">Settings 🔧</h1>
    {changePassword && (
      <span 
      className="self-start p-2"
      onClick={() => setChangePassword((_) => !_)}
      > 	&larr; Go back back</span>
    )}

    {!changePassword ? (<>
          <div className="setting-input-container">
            <label htmlFor="username" className="font-semibold">Username</label>
                <input type="text" 
                className="setting-input"
                name="username" 
                placeholder={local_values.username}
                onChange={handleChange} 
                required />
          </div>

          <div className="setting-input-container">

            <label htmlFor="email" className="font-semibold">Email</label>
            <input type="email" 
            className="setting-input"
            name="email" 
            placeholder={local_values.email} 
            onChange={handleChange} 
            required />
          </div>

        <button 
          className="bg-red-800 p-2 rounded-md mt-5"
          onClick={() => setChangePassword((_) => !_)}>
          Change password
         </button>

        </>):(<>
          <div className="setting-input-container">
              <label htmlFor="password">Current password</label>
              <input type="password" 
              className="setting-input"
              name="password" 
              placeholder="Current Password" 
              onChange={handleChange} 
              required />
          </div>
          <div className="setting-input-container">
              <label htmlFor="confirmPassword">Confirm your current password</label>
              <input type="password" 
              className="setting-input"
              name="confirmPassword" 
              placeholder="Confirm your current password" 
              onChange={handleChange} 
              required />
          </div>
            <div className="setting-input-container">
              <label htmlFor="newPassword">New password</label>
              <input type="password" 
              className="setting-input"
              name="newPassword" 
              placeholder="New Password" 
              onChange={handleChange} 
              required />
          </div>
        </> )}
       
            <button className="bg-green-800 p-2 rounded-md mt-2">
                Update
            </button>
        <p className="p-2">
            Want to delete your account ?
            <span className="text-red-600 drop-shadow-lg">
              <Link to="/account/delete">
                 &nbsp;Delete&nbsp; 
               </Link>
            </span>
         </p>
    </form>
    <ToastContainer />
</div>
  )
};

export default Settings;
