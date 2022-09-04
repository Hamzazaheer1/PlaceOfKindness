import React, { useCallback, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";

import setAuthToken from "./utils/setAuthToken";
import MyNavbar from "./shared/MyNavbar/MyNavbar";
import Homepage from "./shared/Homepage/Homepage";
import Forum from "./shared/Forum/Forum";
import Request from "./shared/Request/Request";
import Login from "./shared/Login/Login";
import Signup from "./shared/Signup/Signup";
import NeedySignup from "./shared/NeedySignup/NeedySignup";
import Footer from "./shared/Footer/Footer";
import AdminDash from "./Admin/AdminDash/AdminDash";
import { AuthContext } from "./shared/ProtectedRoute/ProtectedRoute";
import SignupDash from "./shared/SignupDash/SignupDash";
import Donated from "./shared/Request/ReqComponents/Donated";
import RequestDona from "./shared/Request/ReqComponents/RequestDona";
import GetDonation from "./shared/Request/ReqComponents/GetDonation/GetDonation";
import ForumComment from "./shared/Forum/ForumComment";
import Logout from "./shared/Logout/Logout";
import NotFoundComponent from "./shared/ComponentNotFound/NotFoundComponent";
import UserProfile from "./User/UserProfile/UserProfile";
import Needy from "./shared/Needy/Needy";
import DonarDash from "./User/Dashboards/DonarDash";
// import NeedyDash from "./User/Dashboards/NeedyDash";
import ForgotPass from "./shared/ForgotPass/ForgotPass";
import ChangePass from "./shared/ForgotPass/ChangePass";
import NeedyDashbord from "./User/Dashboards/NeedyDashbord";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

let logUser;
let jwt;
if (localStorage.donator) {
  jwt = localStorage.getItem("donator");
  setAuthToken(jwt);
  logUser = jwtDecode(jwt);
} else if (localStorage.token) {
  jwt = localStorage.getItem("token");
  setAuthToken(jwt);
  logUser = jwtDecode(jwt);
} else if (localStorage.needy) {
  jwt = localStorage.getItem("needy");
  setAuthToken(jwt);
  logUser = jwtDecode(jwt);
}
function App() {
  // eslint-disable-next-line
  const [user, setUser] = useState(logUser);

  console.log(user);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;

  if (user) {
    routes = (
      <React.Fragment>
        <Route path="/admindash" element={<AdminDash />} />
        <Route path="/donordash" element={<DonarDash />} />
        {/* <Route path="/donordash/donate" element={<DDonate />} /> */}
        <Route path="/needydash" element={<NeedyDashbord />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupdash" element={<SignupDash />} />
        <Route path="/needysignup" element={<NeedySignup />} />
        <Route path="*" element={<NotFoundComponent />} />
      </React.Fragment>
    );
  }

  return (
    <div className="App">
      <AuthContext.Provider
        value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
      >
        <BrowserRouter>
          <MyNavbar user={user} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/needy" element={<Needy />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/request" element={<Request />} />
            <Route path="/donateditems" element={<Donated />} />
            <Route path="/reqdonation" element={<RequestDona />} />
            <Route path="/getdonation" element={<GetDonation />} />
            <Route path="/forumcomments" element={<ForumComment />} />
            <Route path="/forgotpass" element={<ForgotPass />} />
            <Route path="/changepass/:token" element={<ChangePass />} />
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
