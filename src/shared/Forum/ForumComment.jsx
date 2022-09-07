import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ForumComment = (props) => {
  let token;
  if (localStorage.token) {
    token = localStorage.getItem("token");
  } else if (localStorage.needy) {
    token = localStorage.getItem("needy");
  } else if (localStorage.donator) {
    token = localStorage.getItem("donator");
  }

  const bearer = "Bearer " + token;
  const [itemData, setItemData] = useState([]);
  const [comment, setComment] = useState();

  useEffect(() => {
    const mycomments = [{ comment: "No comment Found", user: ["temp"] }];

    const getItems = async () => {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/posts/${props.data}`
      );
      const responseData = await response.json();
      setItemData(responseData.data.comments);
      if (responseData.data.comments.length !== 0) {
        setItemData(responseData.data.comments);
      } else {
        setItemData(mycomments);
      }
    };

    getItems();
  }, [props.data]);

  const commentSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/posts/${props.data}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            comment: comment,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert(responseData.status);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h2>Post Title</h2>
      <h4>{props.title}</h4>
      {token && (
        <Form>
          <Form.Group className="mb-3" controlId="address">
            <Form.Control
              type="text"
              required
              onChange={(e) => setComment(e.target.value)}
              placeholder={"What's are your thoughts "}
            />
          </Form.Group>
          <Button variant="dark" onClick={commentSubmitHandler}>
            Comment
          </Button>
        </Form>
      )}
      <br />

      {itemData &&
        itemData.map((item, index) => (
          <Alert variant={"dark"}>
            <p>Comment {index + 1}</p>
            <b>{item.user[0].name}</b>
            <br />
            <b>{item.comment}</b>
          </Alert>
        ))}
    </Container>
  );
};

export default ForumComment;
