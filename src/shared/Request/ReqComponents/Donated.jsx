import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Donated = () => {
  const token = localStorage.getItem("needy");
  const bearer = "Bearer " + token;
  const [itemdata, setItemData] = useState([]);
  const [RespData, setRespData] = useState([]);
  const [itemId, setItemId] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/items/"
      );
      const responseData = await response.json();
      setItemData(responseData.data);
    };

    getItems();
  });

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/getme",
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

    getProfile();
  }, [bearer]);

  const dataHandler = (a, b, c, d) => {
    setItemId(a);
    setImage(b);
    setName(c);
    setCategory(d);
  };

  const getDonationHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/items/${itemId}/needyitem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            shipaddress: address,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("You will get item soon");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Container style={{ marginBottom: "4rem" }}>
        <h1>Enter Details below to get specific item</h1>
        <p>Click on Select Item before clicking get Donation</p>
        <Row>
          <Col md={8}>
            {RespData && RespData.role === "needy" ? (
              <Form>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    Re'check the address before clicking Get Donation.
                  </Form.Text>
                </Form.Group>
                <Button variant="dark" onClick={getDonationHandler}>
                  Get Donation
                </Button>
              </Form>
            ) : (
              <h5>Only Needy can get the items</h5>
            )}
          </Col>
          <Col md={4}>
            <Card style={{ width: "18rem", color: "white" }} bg={"dark"}>
              <Card.Img
                variant="top"
                src={image}
                alt="notFound"
                height={"210px"}
              />
              <ListGroup className="list-group-flush">
                <Card.Title>{name}</Card.Title>
                <ListGroup.Item>{category}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container style={{ marginBottom: "4rem" }}>
        <h1>List of Donated Items</h1>
        <Row>
          {itemdata &&
            itemdata.map((item, index) => (
              <div key={index + 1}>
                {!item.given && item.available && (
                  <Card
                    style={{
                      width: "18rem",
                      color: "white",
                      marginTop: "2rem",
                      marginRight: "1rem",
                    }}
                    bg={"dark"}
                    key={index + 1}
                  >
                    <Card.Img
                      variant="top"
                      src={item.photo}
                      alt="notFound"
                      height={"210px"}
                    />
                    <ListGroup className="list-group-flush">
                      <Card.Title>{item.name}</Card.Title>
                      <ListGroup.Item>{item.category}</ListGroup.Item>
                      <ListGroup.Item>{item.user[0].name}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                      <Card.Link
                        onClick={() => {
                          dataHandler(
                            item.id,
                            item.photo,
                            item.name,
                            item.category
                          );
                        }}
                      >
                        Select Item
                      </Card.Link>
                    </Card.Body>
                  </Card>
                )}
              </div>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default Donated;
