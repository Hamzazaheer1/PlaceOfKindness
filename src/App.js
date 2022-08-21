import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import MyNavbar from "./shared/MyNavbar/MyNavbar";
import Homepage from "./shared/Homepage/Homepage";
import Donors from "./shared/Donors/Donors";
import Forum from "./shared/Forum/Forum";
import Request from "./shared/Request/Request";
import Login from "./shared/Login/Login";
import Signup from "./shared/Signup/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./shared/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/request" element={<Request />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
