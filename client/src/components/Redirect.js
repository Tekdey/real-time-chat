import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth-user")) {
      navigate("/room");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Todo

  return;
};

export default Redirect;
