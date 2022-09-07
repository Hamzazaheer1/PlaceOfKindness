import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";

const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/forgotpassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Password reset email sent to your email Sucessfully!!");
      window.location = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md-4></Col>
        <Col md-4>
          <h1>Forgot Password</h1>
          <br />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                Enter the registered Email and reset Password link will be sent
                to your Email.
              </Form.Text>
            </Form.Group>
            <Button variant="dark" onClick={submitHandler}>
              Reset Password
            </Button>
          </Form>
        </Col>
        <Col md-4></Col>
      </Row>
    </Container>
  );
};

export default ForgotPass;
