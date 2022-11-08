import React, { useState, useEffect } from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const APurchases = () => {
  let jwt;
  if (localStorage.token) {
    jwt = localStorage.getItem("token");
  }
  const bearer = "Bearer " + jwt;

  const [respData, setRespData] = useState([]);
  const [unRespData, setUnRespData] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/needyitem/allpurchasing",
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
    const getUnshippedItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/needyitem/unshipped",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );
      const responseData = await response.json();
      setUnRespData(responseData.data);
    };

    getItems();
    getUnshippedItems();
  }, [bearer]);

  const commentUpdateHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/needyitem//itemshiptoneedy/${x}`,
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
      alert("Item Shipped Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h1>Users Purchases</h1>
      <Row>
        <Col md={5}>
          <h2>All Items</h2>
          {respData ? (
            respData.map((item, index) => (
              <Alert key={index + 1} variant={"dark"}>
                <p>{item.shipaddress}</p>
                <p>{item.createdAt}</p>
                {item.shipped ? <p>Shipped</p> : <p>Not Shipped</p>}
                {/* <p>{item.item[0].name}</p>
                <p>{item.user[0].name}</p> */}
                <Button
                  variant="primary"
                  onClick={() => {
                    commentUpdateHandler(item.item[0]._id);
                  }}
                >
                  Update
                </Button>
              </Alert>
            ))
          ) : (
            <p>No data to be found</p>
          )}
        </Col>
        <Col md={2}></Col>
        <Col md={5}>
          <h2>UnShipped Items</h2>
          {unRespData ? (
            unRespData.map((item, index) => (
              <Alert key={index + 1} variant={"dark"}>
                {item.item.map((i, key) => (
                  <h5 key={key + 1}>{i}</h5>
                ))}
                <p>{item.shipaddress}</p>
                {item.shipped ? <p>Shipped</p> : <p>Not Shipped</p>}
                <p>{item.user[0]}</p>
                <p>{item.createdAt}</p>
                <Button
                  variant="primary"
                  onClick={() => {
                    commentUpdateHandler(item._id);
                  }}
                >
                  Update
                </Button>
              </Alert>
            ))
          ) : (
            <p>No data to be found</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default APurchases;
