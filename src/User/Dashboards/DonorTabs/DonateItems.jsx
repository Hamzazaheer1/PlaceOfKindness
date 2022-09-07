import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const DonateItems = () => {
  let token;
  if (localStorage.donator) {
    token = localStorage.getItem("donator");
  }

  const bearer = "Bearer " + token;
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setIamge] = useState("");
  const [respData, setRespData] = useState([]);

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

  const itemPostHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("photo", image);
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/items/createItem",
        {
          method: "POST",
          headers: {
            Authorization: bearer,
          },
          body: formData,
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        console.log(response);
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Item Post Created Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

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
      setRespData(responseData.data.items);
    };

    getProfile();
  }, [bearer]);

  return (
    <Container>
      <Row>
        <Col md={4}>
          <h2>Donate Item</h2>
          <Form>
            <Form.Group className="mb-3" controlId="address">
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                placeholder={"Enter Name"}
              />
              <br />
              <Form.Select
                aria-label="dropdown"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select Category</option>
                <option value="Clothing">Clothing</option>
                <option value="Shoes">Shoes</option>
                <option value="Electronics">Electronics</option>
                <option value="House Items">House Items</option>
                <option value="Others">Others</option>
              </Form.Select>
              <br />
              <Form.Control
                type="file"
                required
                onChange={(e) => setIamge(e.target.files[0])}
                placeholder={"Upload Image"}
              />
            </Form.Group>
            <Button variant="dark" onClick={itemPostHandler}>
              Submit Item
            </Button>
          </Form>
        </Col>
        <Col md={8}>
          <h2>Donated Iteams</h2>
          <Row>
            {respData ? (
              respData.map((item, index) => (
                <Card
                  key={index + 1}
                  bg={"dark"}
                  style={{
                    width: "15rem",
                    color: "white",
                    marginRight: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <img
                    src={item.photo}
                    alt="notFound"
                    style={{ width: "100px" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Title>{item.category}</Card.Title>
                    <Card.Title>{item.createdAt}</Card.Title>
                    <Button
                      variant="danger"
                      onClick={() => {
                        itemDeleteHandler(item.id);
                      }}
                    >
                      Delete Item
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No Item Found</p>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
    // <div>
    //   <h1>Donator Items</h1>
    //   <br />
    //   <br />
    //   <div>
    //     <h2>Donate Item</h2>
    //     <form>
    //       <input
    //         type="text"
    //         required
    //         onChange={(e) => setName(e.target.value)}
    //         placeholder={"Enter Name"}
    //       />
    //       <br />
    //       <br />
    //       <input
    //         type="text"
    //         required
    //         onChange={(e) => setCategory(e.target.value)}
    //         placeholder={"Enter Category"}
    //       />
    //       <br />
    //       <br />
    //       <input
    //         type="file"
    //         required
    //         onChange={(e) => setIamge(e.target.files[0])}
    //         placeholder={"Upload Image"}
    //       />
    //       <br />
    //       <br />
    //       <button onClick={itemPostHandler}>Submit</button>
    //       <br />
    //     </form>
    //   </div>

    //   <div>
    //     <h2>Donated Iteams</h2>
    //     {respData ? (
    //       respData.map((item) => (
    //         <div style={{ border: "solid" }}>
    //           <img src={item.photo} alt="notFound" style={{ width: "100px" }} />
    //           <h4>{item.name}</h4>
    //           <h4>{item.category}</h4>
    //           <h4>{item.createdAt}</h4>
    //           <p
    //             onClick={() => {
    //               itemDeleteHandler(item.id);
    //             }}
    //             style={{
    //               boarder: "solid",
    //               backgroundColor: "grey",
    //               color: "white",
    //               width: "8vw",
    //             }}
    //           >
    //             Delete Item
    //           </p>
    //         </div>
    //       ))
    //     ) : (
    //       <h4>No item found...</h4>
    //     )}
    //   </div>
    // </div>
  );
};

export default DonateItems;
