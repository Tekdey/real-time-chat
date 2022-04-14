import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const useAuth = () => {
  const user = { loggedIn: false };
  if (localStorage.getItem("auth-user")) {
    user.loggedIn = true;
  }
  return user && user.loggedIn;
};

const RoutesProtection = () => {
  const isAuth = useAuth();
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RoutesProtection;
