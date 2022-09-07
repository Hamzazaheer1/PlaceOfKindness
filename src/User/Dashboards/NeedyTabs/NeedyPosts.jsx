import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const NeedyPosts = () => {
  let token;
  if (localStorage.needy) {
    token = localStorage.getItem("needy");
  }
  let bearer = "Bearer " + token;

  const [respData, setRespData] = useState([]);

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
      setRespData(responseData.data.posts);
    };

    getProfile();
  }, [bearer]);

  console.log(respData);
  return (
    <Container>
      <h3>Your Posts</h3>
      {respData ? (
        respData.map((item) => (
          <Alert variant={"dark"}>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.createdAt}</p>
          </Alert>
        ))
      ) : (
        <p>no posts found</p>
      )}
    </Container>
  );
};

export default NeedyPosts;
