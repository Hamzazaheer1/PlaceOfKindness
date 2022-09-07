import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";

const NeedyPurchases = () => {
  let token;
  if (localStorage.needy) {
    token = localStorage.getItem("needy");
  }
  let bearer = "Bearer " + token;

  const [spent, setRespDataSpent] = useState([]);
  const [unspent, setRespDataUnspent] = useState([]);

  useEffect(() => {
    const getUnsentItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/needyitem/needyunsentitems",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );
      const responseData = await response.json();
      setRespDataUnspent(responseData.data);
    };

    const getSentItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/needyitem/needysentitems",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );
      const responseData = await response.json();
      setRespDataSpent(responseData.data);
    };

    getUnsentItems();
    getSentItems();
  }, [bearer]);

  return (
    <Container>
      <h1>NeedyPurchases</h1>
      <Row>
        <Col md={5}>
          <h2>Needy Shipped Items</h2>
          <br />
          {spent ? (
            spent.map((item, index) => (
              <div key={index + 1}>
                {item.shipped && (
                  <Alert variant="dark">
                    <p>{item.id}</p>
                    {item.shipped ? <p>Shipped</p> : <p>UnShipped</p>}
                  </Alert>
                )}
              </div>
            ))
          ) : (
            <p>No Item Found</p>
          )}
        </Col>
        <Col md={2}></Col>
        <Col md={5}>
          <h2>Needy Un-Shipped Items</h2>
          <br />
          {unspent ? (
            unspent.map((item, index) => (
              <div key={index + 1}>
                {!item.shipped && (
                  <Alert variant="dark">
                    <p>{item.id}</p>
                    {item.shipped ? <p>Shipped</p> : <p>UnShipped</p>}
                    <p>{item.shipaddress}</p>
                    <p>{item.createdAt}</p>
                  </Alert>
                )}
              </div>
            ))
          ) : (
            <p>No Item Found</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default NeedyPurchases;
