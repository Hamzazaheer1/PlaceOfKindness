import React from "react";
import { Link } from "react-router-dom";
import "./MyNavbar.css";

const MyNavbar = () => {
  return (
    <nav>
      <div class="logo">
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
      <div class="nav-items">
        <li>
          <Link to="/donors">Donors</Link>
        </li>
        <li>
          <Link to="/forum">Forum</Link>
        </li>
        <li>
          <Link to="/request">Request</Link>
        </li>
      </div>
      <div class="nav-items" style={{ paddingLeft: "70rem" }}>
        <li>
          <Link to="/login">Sign in</Link>
        </li>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
      </div>
    </nav>
  );
};

export default MyNavbar;
