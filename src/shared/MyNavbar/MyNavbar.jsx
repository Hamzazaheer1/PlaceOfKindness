import React from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

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
  );
};

export default MyNavbar;
