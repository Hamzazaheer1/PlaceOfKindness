import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const AComment = () => {
  let jwt;
  if (localStorage.token) {
    jwt = localStorage.getItem("token");
  }
  const bearer = "Bearer " + jwt;

  const [respData, setRespData] = useState([]);
  let response;
  let responseData;
  const getDonors = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/comments/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      }
    );
    responseData = await response.json();
    setRespData(responseData.data);
  };

  useEffect(() => {
    getDonors();
  }, []);

  const postDeleteHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/comments/${x}`,
        {
          method: "DELETE",
          headers: {
            Authorization: bearer,
          },
        }
      );

      if (response.status === 204) {
        alert("Comment Deleted Sucessfully!!!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h1>Users Comments</h1>
      {respData ? (
        respData.map((item) => (
          <Alert variant={"dark"}>
            <h5>{item.comment}</h5>
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
    // <div>
    //   <h1>Admin Comment Panel</h1>
    //   <br />
    //   <h1>Comments</h1>
    //   {respData &&
    //     respData.map((item) => (
    //       <div style={{ border: "solid" }}>
    //         <h5>{item.comment}</h5>
    //         <h5>{item.user[0].name}</h5>
    //         <h5>{item.createdAt}</h5>
    //         <div style={{ display: "flex" }}>
    //           <p
    //             onClick={() => {
    //               postDeleteHandler(item.id);
    //             }}
    //             style={{
    //               boarder: "solid",
    //               backgroundColor: "grey",
    //               color: "white",
    //               width: "3vw",
    //             }}
    //           >
    //             Delete
    //           </p>
    //         </div>
    //       </div>
    //     ))}
    // </div>
  );
};

export default AComment;
