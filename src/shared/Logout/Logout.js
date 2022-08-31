import React, { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("donator");
    localStorage.removeItem("needy");
    window.location = "/";
  }, []);
  return null;
};

export default Logout;
