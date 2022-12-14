import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const Navigate = useNavigate();

  function handleClick() {
    Navigate("/signup");
  }

  return (
    <Card bg="dark" className="text-center" style={{ color: "white" }}>
      <Card.Header>Place of Kindness</Card.Header>
      <Card.Body>
        <Card.Title>Mother Teresa</Card.Title>
        <Card.Text>
          "Let us touch the dying, the poor, the lonely and the unwanted
          according to the graces we have received and let us not be ashamed or
          slow to do the humble work."
        </Card.Text>
        <Button variant="primary" onClick={handleClick}>
          Become a Donator Now
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">By Hamza.</Card.Footer>
    </Card>
  );
};

export default Footer;
