import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: username,
            password: password,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert(responseData.data.role);

      if (responseData.data.role === "donator") {
        localStorage.setItem("donator", responseData.token);
        window.location = "/donordash";
      } else if (responseData.data.role === "needy") {
        localStorage.setItem("needy", responseData.token);
        window.location = "/needydash";
      } else if (responseData.data.role === "unverified") {
        alert("Not Verified yet....");
      } else {
        localStorage.setItem("token", responseData.token);
        window.location = "/admindash";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const forgotHandler = () => {
    window.location = "/forgotpass";
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <div style={{ marginTop: "5rem", marginBottom: "13rem" }}>
            <Form>
              <h1>Sign In</h1>
              <Form.Group className="mb-3 mt-4" controlId="Email">
                <Form.Label>Email address | Username</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email or username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button variant="dark" onClick={authSubmitHandler}>
                Signin
              </Button>
              <br />
              <br />
              <p onClick={forgotHandler}>
                <b>Forgot Password</b>
              </p>
            </Form>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Login;
