import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../ProtectedRoute/ProtectedRoute";
import "./MyNavbar.css";

const MyNavbar = () => {
  const auth = useContext(AuthContext);
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
        {auth.isLoggedIn && (
          <li>
            <Link to="/admindash">UserDash</Link>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <Link to="/userdash">AdminDash</Link>
          </li>
        )}
      </div>
      {/* paddingLeft 70rem after removal of dash */}
      <div class="nav-items" style={{ paddingLeft: "55rem" }}>
        {!auth.isLoggedIn && (
          <li>
            <Link to="/login">Sign in</Link>
          </li>
        )}
        {!auth.isLoggedIn && (
          <li>
            <Link to="/signupdash">Sign up</Link>
          </li>
        )}
        {auth.isLoggedIn && (
          <li>
            <button onClick={auth.logout}>Logout</button>
          </li>
        )}
      </div>
    </nav>
  );
};

export default MyNavbar;
