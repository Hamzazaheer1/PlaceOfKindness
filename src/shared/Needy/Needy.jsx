import React from "react";
import { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const Needy = () => {
  const [respData, setRespData] = useState([]);

  useEffect(() => {
    const getDonors = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/needyusers"
      );
      const responseData = await response.json();
      setRespData(responseData.data);
    };

    getDonors();
  });

  return (
    <Container>
      <h1 style={{ marginTop: "2rem" }}>List of Needy User</h1>
      <Row>
        {respData.map((item, index) => (
          <Card
            bg="dark"
            style={{
              width: "15rem",
              color: "white",
              marginRight: "1rem",
              marginTop: "2rem",
              marginBottom: "5rem",
            }}
            key={index + 1}
          >
            <Card.Img variant="top" src={item.photo} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Needy;
