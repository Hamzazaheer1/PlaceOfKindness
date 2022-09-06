import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Needy = () => {
  const [respData, setRespData] = useState([]);

  let response;
  let responseData;
  const getDonors = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/users/needyusers"
    );
    responseData = await response.json();
    setRespData(responseData.data);
  };

  useEffect(() => {
    getDonors();
  });

  return (
    <Container>
      <h1 style={{ marginTop: "2rem" }}>List of Needy User</h1>
      <Row>
        {respData.map((item) => (
          <Card
            bg="dark"
            style={{
              width: "15rem",
              color: "white",
              marginRight: "1rem",
              marginTop: "2rem",
              marginBottom: "5rem",
            }}
          >
            <Card.Img variant="top" src={item.photo} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
    // <div style={{ marginLeft: "2rem", marginTop: "1rem" }}>
    //   <h1>Needy</h1>
    //   <div>
    //     {respData.map((item) => (
    //       <div>
    //         <img src={item.photo} alt="notfound" width="100px" />
    //         <p>{item.name}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Needy;
