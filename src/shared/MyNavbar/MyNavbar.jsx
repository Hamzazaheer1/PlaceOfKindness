import React from "react";
import { Link } from "react-router-dom";
import "./MyNavbar.css";
// import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
//import NavDropdown from "react-bootstrap/NavDropdown";

const MyNavbar = (user) => {
  let x;
  if (localStorage.donator) {
    x = "donator";
  } else if (localStorage.needy) {
    x = "needy";
  } else if (localStorage.token) {
    x = "token";
  }

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand
          as={Link}
          to="/"
          style={{ color: "#0092dd", fontStyle: "bold" }}
        >
          PlaceOfKindness
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/needy">
              Needy
            </Nav.Link>
            <Nav.Link as={Link} to="/request">
              Request
            </Nav.Link>
            <Nav.Link as={Link} to="/forum">
              Forum
            </Nav.Link>
            {user.user && x === "token" && (
              <Nav.Link as={Link} to="/admindash">
                AdminPanel
              </Nav.Link>
            )}
            {user.user && x === "donator" && (
              <Nav.Link as={Link} to="/donordash">
                DonatorPanel
              </Nav.Link>
            )}
            {user.user && x === "needy" && (
              <Nav.Link as={Link} to="/needydash">
                NeedyPanel
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {!user.user && (
              <Nav.Link as={Link} to="/login">
                Sign in
              </Nav.Link>
            )}
            {!user.user && (
              <Nav.Link as={Link} to="/signupdash">
                Sign up
              </Nav.Link>
            )}
            {user.user && (
              <Nav.Link as={Link} to="/userprofile">
                Profile
              </Nav.Link>
            )}
            {user.user && (
              <Nav.Link as={Link} to="/logout">
                Sign out
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
    // <nav>
    //   <div className="logo">
    //     <Link
    //       style={{
    //         color: "#0092dd",
    //         fontSize: "30px",
    //         fontWeight: "600",
    //         letterSpacing: "-1px",
    //         textDecoration: "none",
    //       }}
    //       to="/"
    //     >
    //       PlaceOfKindness
    //     </Link>
    //   </div>
    //   <div className="nav-items">
    //     <li>
    //       <Link to="/needy">Needy</Link>
    //     </li>
    //     <li>
    //       <Link to="/forum">Forum</Link>
    //     </li>
    //     <li>
    //       <Link to="/request">Request</Link>
    //     </li>
    //     {user.user && x === "donator" && (
    //       <li>
    //         <Link to="/donordash">DonorDash</Link>
    //       </li>
    //     )}
    //     {user.user && x === "needy" && (
    //       <li>
    //         <Link to="/needydash">NeedyDash</Link>
    //       </li>
    //     )}
    //     {user.user && x === "token" && (
    //       <li>
    //         <Link to="/admindash">AdminDash</Link>
    //       </li>
    //     )}
    //   </div>
    //   <div className="nav-items" style={{ paddingLeft: "55rem" }}>
    //     {!user.user && (
    //       <li>
    //         <Link to="/login">Sign in</Link>
    //       </li>
    //     )}
    //     {!user.user && (
    //       <li>
    //         <Link to="/signupdash">Sign up</Link>
    //       </li>
    //     )}
    //     {user.user && (
    //       <li>
    //         <Link to="/userprofile">Profile</Link>
    //       </li>
    //     )}
    //     {user.user && (
    //       <li>
    //         <Link to="/logout">Logout</Link>
    //       </li>
    //     )}
    //   </div>
    // </nav>
  );
};

export default MyNavbar;
