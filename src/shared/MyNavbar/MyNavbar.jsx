import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import { AuthContext } from "../ProtectedRoute/ProtectedRoute";
import "./MyNavbar.css";

const MyNavbar = (user) => {
  console.log(user.user);
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
          <Link to="/needy">Needy</Link>
        </li>
        <li>
          <Link to="/forum">Forum</Link>
        </li>
        <li>
          <Link to="/request">Request</Link>
        </li>
        {user.user && (
          <li>
            <Link to="/admindash">UserDash</Link>
          </li>
        )}
        {user.user && (
          <li>
            <Link to="/userdash">AdminDash</Link>
          </li>
        )}
      </div>
      {/* paddingLeft 70rem after removal of dash */}
      <div class="nav-items" style={{ paddingLeft: "55rem" }}>
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
