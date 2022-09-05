import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./MyNavbar.css";

const MyNavbar = (user) => {
  let x;
  if (localStorage.donator) {
    x = localStorage.getItem("donator");
  } else if (localStorage.needy) {
    x = localStorage.getItem("needy");
  } else if (localStorage.token) {
    x = localStorage.getItem("token");
  }

  return (
    <nav>
      <div className="logo">
        <Link
          style={{
            color: "#0092dd",
            fontSize: "30px",
            fontWeight: "600",
            letterSpacing: "-1px",
            textDecoration: "none",
          }}
          to="/"
        >
          PlaceOfKindness
        </Link>
      </div>
      <div className="nav-items">
        <li>
          <Link to="/needy">Needy</Link>
        </li>
        <li>
          <Link to="/forum">Forum</Link>
        </li>
        <li>
          <Link to="/request">Request</Link>
        </li>
        {user.user && x === "donator" && (
          <li>
            <Link to="/donordash">DonorDash</Link>
          </li>
        )}
        {user.user && x === "needy" && (
          <li>
            <Link to="/needydash">NeedyDash</Link>
          </li>
        )}
        {user.user && x === "token" && (
          <li>
            <Link to="/admindash">AdminDash</Link>
          </li>
        )}
      </div>
      {/* paddingLeft 70rem after removal of dash */}
      <div className="nav-items" style={{ paddingLeft: "55rem" }}>
        {!user.user && (
          <li>
            <Link to="/login">Sign in</Link>
          </li>
        )}
        {!user.user && (
          <li>
            <Link to="/signupdash">Sign up</Link>
          </li>
        )}
        {user.user && (
          <li>
            <Link to="/userprofile">Profile</Link>
          </li>
        )}
        {user.user && (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        )}
      </div>
    </nav>
  );
};

export default MyNavbar;
