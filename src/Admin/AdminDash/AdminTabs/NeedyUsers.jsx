import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

const NeedyUsers = () => {
  let jwt;
  if (localStorage.token) {
    jwt = localStorage.getItem("token");
  }
  const bearer = "Bearer " + jwt;

  const [respData, setRespData] = useState([]);

  useEffect(() => {
    const getDonors = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/unverifiedneedy",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );
      const responseData = await response.json();
      setRespData(responseData.data);
    };

    getDonors();
  }, [bearer]);

  const userUpdateHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/users/needyverify/${x}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Request Updated Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h2>Unvarified Needy Users</h2>
      <Row className="mt-2">
        {respData &&
          respData.map((item) => (
            <Card
              bg={"dark"}
              style={{
                width: "18rem",
                marginRight: "1rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.email}</Card.Text>
                <Card.Text>{item.username}</Card.Text>
                <Card.Text>{item.cnic}</Card.Text>
                <Card.Text>{item.temprole}</Card.Text>
                <Card.Text>{item.role}</Card.Text>
                <Card.Text>{item.requestlimit}</Card.Text>
                <Card.Text>{item.requestlimit}</Card.Text>
                <Card.Text>{item.donated}</Card.Text>
              </Card.Body>
              <Card.Body>
                <Button
                  variant="primary"
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    userUpdateHandler(item._id);
                  }}
                >
                  Update Needy Role
                </Button>
              </Card.Body>
            </Card>
          ))}
      </Row>
    </Container>
    // <div>
    //   <h1>List of Unvarified Needy Users</h1>
    //   {respData &&
    //     respData.map((item) => (
    //       <div style={{ border: "solid" }}>
    //         <p>{item.name}</p>
    //         <p>{item.email}</p>
    //         <p>{item.username}</p>
    //         <p>{item.cnic}</p>
    //         <p>{item.temprole}</p>
    //         <p>{item.role}</p>
    //         <p>{item.requestlimit}</p>
    //         <p>{item.donated}</p>
    //         <p
    //           onClick={() => {
    //             userUpdateHandler(item._id);
    //           }}
    //           style={{
    //             boarder: "solid",
    //             backgroundColor: "grey",
    //             color: "white",
    //             width: "8vw",
    //           }}
    //         >
    //           Update Needy Role
    //         </p>
    //       </div>
    //     ))}
    // </div>
  );
};

export default NeedyUsers;
