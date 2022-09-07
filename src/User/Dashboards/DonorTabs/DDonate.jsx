import React, { useState, useEffect } from "react";
import { Container, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const DDonate = () => {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  // eslint-disable-next-line
  const [param1, setParam1] = useState(urlParams.get("usertoken"));
  // eslint-disable-next-line
  const [param2, setParam2] = useState(urlParams.get("amount"));

  let token;
  if (localStorage.donator) {
    token = localStorage.getItem("donator");
  }
  const bearer = "Bearer " + token;
  const [amount, setAmount] = useState(0);
  const [respData, setRespData] = useState([]);
  const [donationRespData, setDonationRespData] = useState([]);

  const donationHandler = async () => {
    const response = await fetch(
      `https://placeofkindness-server.herokuapp.com/api/v1/donations/checkoutsession/${amount}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      }
    );
    const responseData = await response.json();
    setRespData(responseData.url);
    window.open(respData);
  };

  useEffect(() => {
    const confirmDonation = async () => {
      try {
        const response = await fetch(
          `https://placeofkindness-server.herokuapp.com/api/v1/donations/create-donations/?usertoken=${param1}&amount=${param2}`,
          {
            method: "POST",
            headers: {
              Authorization: bearer,
            },
          }
        );

        const responseData = await response.json();
        if (!response.ok) {
          console.log(response);
          alert(responseData.message);
          throw new Error(responseData.message);
        }
        alert("Donation Send Sucessfully Sucessfully!!!!");
        setDonationRespData(responseData.donation);
      } catch (err) {
        console.log(err);
      }
    };

    confirmDonation();
  }, [bearer, param1, param2]);

  return (
    <Container>
      <Row className="mb-4">
        <h1>Donate to Place of Kindness Directly</h1>
        <Form>
          <Form.Group className="mb-3" controlId="address">
            <Form.Control
              type="number"
              required
              onChange={(e) => setAmount(e.target.value)}
              placeholder={"Enter Amount"}
            />
          </Form.Group>
          <Button variant="dark" onClick={donationHandler}>
            Transfer Amount
          </Button>
        </Form>
      </Row>
      <Button variant="primary">View Transactions</Button>
      <Row className="mt-4">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {donationRespData &&
              donationRespData.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.amount}pkr</td>
                  <td>{item.cratedAt}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default DDonate;
