import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const UsersPost = () => {
  let jwt;
  if (localStorage.token) {
    jwt = localStorage.getItem("token");
  }
  const bearer = "Bearer " + jwt;
  const [itemData, setItemData] = useState([]);

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

  const postDeleteHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/posts/${x}`,
        {
          method: "DELETE",
          headers: {
            Authorization: bearer,
          },
        }
      );

      if (response.status === 204) {
        alert("Request Deleted Sucessfully!!!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h1>Users Posts</h1>
      {itemData ? (
        itemData.map((item, index) => (
          <Alert key={index + 1} variant={"dark"}>
            <p>{item.id}</p>
            <h5>{item.title}</h5>
            <p>{item.description}</p>
            <p>{item.user[0].name}</p>
            <p>{item.createdAt}</p>
            <Button
              variant="danger"
              onClick={() => {
                postDeleteHandler(item.id);
              }}
            >
              Delete
            </Button>
          </Alert>
        ))
      ) : (
        <p>No data to be found</p>
      )}
    </Container>
  );
};

export default UsersPost;
