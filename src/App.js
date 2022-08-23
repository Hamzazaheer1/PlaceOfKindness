import React, { useCallback, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import MyNavbar from "./shared/MyNavbar/MyNavbar";
import Homepage from "./shared/Homepage/Homepage";
import Donors from "./shared/Donors/Donors";
import Forum from "./shared/Forum/Forum";
import Request from "./shared/Request/Request";
import Login from "./shared/Login/Login";
import Signup from "./shared/Signup/Signup";
import NeedySignup from "./shared/NeedySignup/NeedySignup";
import Footer from "./shared/Footer/Footer";
import AdminDash from "./Admin/AdminDash/AdminDash";
import UserDash from "./User/UserDash/UserDash";
import { AuthContext } from "./shared/ProtectedRoute/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SignupDash from "./shared/SignupDash/SignupDash";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Route path="/admindash" element={<AdminDash />} />
        <Route path="/userdash" element={<UserDash />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupdash" element={<SignupDash />} />
        <Route path="/needysignup" element={<NeedySignup />} />
      </React.Fragment>
    );
  }

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
        <BrowserRouter>
          <MyNavbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/request" element={<Request />} />
            {routes}
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admindash" element={<AdminDash />} />
            <Route path="/userdash" element={<UserDash />} /> */}
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
