import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ChangePass = () => {
  const [password, setPassword] = useState("");
  const [passwordcnfm, setPasswordcnfm] = useState("");

  let { token } = useParams();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/users/resetpassword/${token}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: password,
            passwordConfirm: passwordcnfm,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Password Changed Sucessfully!!");
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
          <h1>Enter your New Password</h1>
          <br />
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="password"
                placeholder="Enter New Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control
                type="password"
                placeholder="Password Confirm"
                required
                onChange={(e) => setPasswordcnfm(e.target.value)}
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

export default ChangePass;
