import React from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const SignupDash = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col sm={3}></Col>
        <Col sm={9}>
          <div style={{ marginTop: "5rem", marginBottom: "13rem" }}>
            <ButtonGroup aria-label="Basic example">
              <div style={{ display: "block" }}>
                <h1>Welcome to Signup Page</h1>
                <h2>Whome would you like to signup as...</h2>
                <Button
                  variant="secondary"
                  className="mt-5"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Donor
                </Button>
                <Button
                  variant="secondary"
                  className="mt-5"
                  style={{ marginLeft: "1rem" }}
                  onClick={() => {
                    navigate("/needysignup");
                  }}
                >
                  Needy
                </Button>
              </div>
            </ButtonGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupDash;
