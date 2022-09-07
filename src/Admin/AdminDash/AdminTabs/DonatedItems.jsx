import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const DonatedItems = () => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;
  const [itemdata, setItemData] = useState([]);
  const [itemdataUn, setItemDataUn] = useState([]);
  const [itemId, setItemId] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [availible, setAvailible] = useState(false);
  const [given, setGiven] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/items/"
      );
      const responseData = await response.json();
      setItemData(responseData.data);
    };

    const getallunavailibleitems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/items/unavailableitems",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );
      const responseData = await response.json();
      setItemDataUn(responseData.data);
    };

    getItems();
    getallunavailibleitems();
  }, [bearer]);

  const itemDeleteHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/items/${x}`,
        {
          method: "DELETE",
          headers: {
            Authorization: bearer,
          },
        }
      );

      if (response.status === 204) {
        alert("Item Deleted Sucessfully!!!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = (a, b, c, d, e) => {
    setItemId(a);
    setName(b);
    setCategory(c);
    setAvailible(d);
    setGiven(e);
  };

  const userUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/items/${itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            name: name,
            category: category,
            availible: availible,
            given: given,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Item Updated Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  const updateUnavailibleItem = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/items/makeitemavailable/${x}`,
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
      alert("Item Updated Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h1>Update Donated Items</h1>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="form">
            <Form.Control
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setCategory(e.target.value)}
              value={name}
            />
            <Form.Select
              aria-label="dropdown"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option>Select Category</option>
              <option value="Clothing">Clothing</option>
              <option value="Shoes">Shoes</option>
              <option value="Electronics">Electronics</option>
              <option value="House Items">House Items</option>
              <option value="Others">Others</option>
            </Form.Select>
            <Form.Group className="mb-3" controlId="checkAvailable">
              <Form.Check
                type="checkbox"
                label="Available"
                onChange={(e) => setAvailible(e.target.value)}
                value={availible}
              />
              <Form.Check
                type="checkbox"
                label="Given"
                onChange={(e) => setGiven(e.target.value)}
                value={given}
              />
            </Form.Group>
          </Form.Group>
          <Button variant="primary" onClick={userUpdateHandler}>
            Submit
          </Button>
        </Form>
      </Row>
      <Row className="mt-5">
        <Col md={5}>
          <h2>List of Donated Items</h2>
          {itemdata &&
            itemdata.map((item, index) => (
              <Alert key={index + 1} variant="dark">
                <h4>{item.name}</h4>
                <h4>{item.category}</h4>
                <h4>{item.createdAt}</h4>
                {item.available ? <h4>Availible</h4> : <h4>Not Availible</h4>}
                {item.given ? <h4>Given</h4> : <h4>Not Given</h4>}
                <h4>{item.user[0].name}</h4>
                <Button
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    updateItem(
                      item.id,
                      item.name,
                      item.category,
                      item.available,
                      item.given
                    );
                  }}
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    itemDeleteHandler(item.id);
                  }}
                >
                  Delete
                </Button>
              </Alert>
            ))}
        </Col>
        <Col md={2}></Col>
        <Col md={5}>
          <h2>List of Unavailabe Items</h2>
          {itemdataUn &&
            itemdataUn.map((item, index) => (
              <Alert key={index + 1} variant="dark">
                <h4>{item.name}</h4>
                <h4>{item.category}</h4>
                <h4>{item.createdAt}</h4>
                {item.available ? <h4>Availible</h4> : <h4>Not Availible</h4>}
                {item.given ? <h4>Given</h4> : <h4>Not Given</h4>}
                <h4>{item.user[0].name}</h4>
                <Button
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    updateUnavailibleItem(item._id);
                  }}
                >
                  Update
                </Button>
              </Alert>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default DonatedItems;
