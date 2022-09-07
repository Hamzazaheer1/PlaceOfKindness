import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ForumComment from "./ForumComment";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const Forum = () => {
  let jwt;
  if (localStorage.donator) {
    jwt = localStorage.getItem("donator");
  } else if (localStorage.needy) {
    jwt = localStorage.getItem("needy");
  }
  const bearer = "Bearer " + jwt;

  const [itemData, setItemData] = useState([]);
  const [itemId, setItemId] = useState("");
  const [itemtitle, setItemTitle] = useState("");
  const [thread, setThread] = useState("");
  const [threadDesc, setThreadDesc] = useState("");

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/posts/"
      );
      const responseData = await response.json();
      setItemData(responseData.data);
    };

    getItems();
  }, []);

  const itemidHandler = (x, y) => {
    setItemId(x);
    setItemTitle(y);
  };

  if (itemId && itemtitle) {
    return <ForumComment data={itemId} title={itemtitle} />;
  }

  const commentPostHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/posts/createPost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            title: thread,
            description: threadDesc,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Thread Created Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h1>Forum</h1>
      <Container style={{ marginBottom: "4rem" }}>
        <h2 style={{ marginTop: "2rem" }}>Create New Thread</h2>
        <Row>
          <Col md={8}>
            {jwt ? (
              <Form>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Control
                    type="text"
                    required
                    onChange={(e) => setThread(e.target.value)}
                    placeholder={"Enter your thought..."}
                  />
                  <br />
                  <Form.Control
                    type="text"
                    required
                    onChange={(e) => setThreadDesc(e.target.value)}
                    placeholder={"Enter Desc"}
                  />
                </Form.Group>
                <Button variant="dark" onClick={commentPostHandler}>
                  Post a Thread
                </Button>
              </Form>
            ) : (
              <h5>You Need to be loged in to post a thread....</h5>
            )}
          </Col>
        </Row>
      </Container>

      <Container>
        <h2>Posted Threads</h2>
        {itemData &&
          itemData.map((item, index) => (
            <Alert variant={"dark"}>
              <b>Post {index + 1}</b>
              <p>{item.user[0].name}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Button
                variant="dark"
                onClick={() => {
                  itemidHandler(item.id, item.title);
                }}
              >
                Show Comments
              </Button>
            </Alert>
          ))}
      </Container>
    </Container>
  );
};

export default Forum;
