import axios from "axios";
import React, { useEffect, useState } from "react";
import { loginRoute, signupRoute, tokenRoute } from "../api/api.path";
import {toast, ToastContainer} from "react-toastify"
import {useNavigate} from "react-router-dom"
import jwt_decode from "jwt-decode"


const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const toastOptions = {
  position: "bottom-right",
  autoClose: 8000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const instance = axios.create({
  baseURL: tokenRoute,
});

export default function Auth() {
  const navigate = useNavigate();

  const [refreshToken, setRefreshToken] = useState(null);
  const [isLogin, setIsLogin] = useState(true)
  const [values, setValues] = useState(INITIAL_STATE);



  useEffect(() => {

    const local = JSON.parse(localStorage.getItem('token'))

    if(local){
      const decodedToken = jwt_decode(local.token)
      const currentDate = new Date()
  
      if (decodedToken.exp * 1000 > currentDate.getTime()){
        navigate('/')
      }
    }
  }, [navigate])



  const loginData = {
    username: values.username,
    password: values.password
  }
  const signUpData = {
    username: values.username,
    email: values.email,
    password: values.password
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {

      instance
        .post(isLogin ? loginRoute : signupRoute, isLogin ? loginData : signUpData)
        .then((response) => {
          setRefreshToken(response.data.refreshToken);
          instance.defaults.headers.common[
            "authorization"
          ] = `Bearer ${response.data.token}`;
          localStorage.setItem('token', JSON.stringify({token: response.data.token}));
          loadUserInfos();
        })
        .catch((error) => {
          toast.error('Unauthorize [401]', toastOptions)
        });
    }
  };

  function loadUserInfos() {
    instance
      .get("/access")
      .then((response) => {
        console.log(response.data);
        if (response) {
          console.log(response);
        }
      })
      .catch((error) => {
        toast.error('Unauthorize [401]', toastOptions)
      });
  }

  useEffect(() => {
    instance.interceptors.response.use(
      (response) => {
        navigate('/')
        return response;
      },
      async (error) => {
        const initial = error.config;
        if (
          error.config.url !== "/refresh" &&
          error.response.status === 401 &&
          initial._retry !== true
        ) {
          initial._retry = true;
          if (refreshToken && refreshToken !== "") {
            instance.defaults.headers.common[
              "authorization"
            ] = `Bearer ${refreshToken}`;
            await instance
              .post("/refresh")
              .then((response) => {
                instance.defaults.headers.common[
                  "authorization"
                ] = `Bearer ${response.data.refreshToken}`;
                initial.headers[
                  "authorization"
                ] = `Bearer ${response.data.refreshToken}`;
              })
              .catch((error) => {
                toast.error('Unauthorize [401]', toastOptions)
                setRefreshToken(null);
              });
            return instance(initial);
          }
        }
      }
    );
  }, [refreshToken]);

  const handleValidation = () => {
    const { password, username } = values;
    console.log(password);
    console.log(username);
    if (password.length < 5) {
      toast.error("username and password requiered", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("username requiered", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleClick = () => {
    setIsLogin(_ => !_)
    setValues(INITIAL_STATE)
  }
  return (
  <div className="flex flex-col justify-center items-center font-bold shadow-2xl rounded-xl">
      <h1 className="text-white text-3xl p-3 drop-shadow-xl -z-20">{isLogin ? "Login" : "Sign up"}</h1>
      <form className="flex flex-col justify-center items-center w-full" onSubmit={handleSubmit}>
        
          
          <div className="auth-input-container">
            <label htmlFor="usename">Username</label>
            <input type="text" name="username" placeholder="username" autoComplete="false" className="auth-input" onChange={handleChange}/>
          </div>
          <div className="auth-input-container">
          {!isLogin && (
          <div className="auth-input-container">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="email" autoComplete="false" className="auth-input" onChange={handleChange}/>
          </div>
          )}
          <div className="auth-input-container">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" autoComplete="false" className="auth-input" onChange={handleChange}/>
          </div>
          </div>
          {!isLogin && (<div className="auth-input-container">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" placeholder="confirm password" autoComplete="false" className="auth-input" onChange={handleChange}/>
          </div>)}
          <button className="bg-white text-black text-xl rounded-md px-3 py-1 m-5">
            {!isLogin ? "Sign up" : "Login"}
          </button>
      </form>
      <p onClick={handleClick}>{!isLogin ? "Already have an account ? Login" : "You don't have an account ? Sign up" }</p>
    <ToastContainer />
  </div>)
};