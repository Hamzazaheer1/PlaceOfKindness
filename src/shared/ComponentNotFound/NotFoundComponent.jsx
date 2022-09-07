import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const NotFoundComponent = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md-8>
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <b>404 Does not exist.</b>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundComponent;
