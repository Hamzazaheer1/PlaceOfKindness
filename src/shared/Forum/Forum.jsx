import React, { useState, useEffect, Children } from "react";
import ForumComment from "./ForumComment";
import Alert from "react-bootstrap/Alert";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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

  let response;
  let responseData;
  const getItems = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/posts/"
    );
    responseData = await response.json();
    setItemData(responseData.data);
  };

  useEffect(() => {
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
                <Button variant="dark">Post a Thread</Button>
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
                  {
                    itemidHandler(item.id, item.title);
                  }
                }}
              >
                Show Comments
              </Button>
            </Alert>
          ))}
      </Container>
    </Container>
    // <div style={{ marginLeft: "2rem", marginTop: "1rem" }}>
    //   <h1>Forum</h1>
    //   <div>
    //     <br />
    //     <br />
    //     {jwt && (
    //       <div>
    //         <h2>Create New Thread</h2>
    //         <form>
    //           <input
    //             type="text"
    //             required
    //             onChange={(e) => setThread(e.target.value)}
    //             placeholder={"Enter your thought..."}
    //             style={{ width: "50rem" }}
    //           />
    //           <br />
    //           <input
    //             type="text"
    //             required
    //             onChange={(e) => setThreadDesc(e.target.value)}
    //             placeholder={"Enter Desc"}
    //             style={{ width: "50rem" }}
    //           />
    //           <br />
    //           <button onClick={commentPostHandler}>Submit</button>
    //         </form>
    //       </div>
    //     )}
    //   </div>

    //   <div style={{ border: "solid", marginTop: "2rem" }}>
    //     {itemData.map((item) => (
    //       <div key={item.id}>
    //         <p>{item.user[0].name}</p>
    //         <h3
    //           onClick={() => {
    //             {
    //               itemidHandler(item.id, item.title);
    //             }
    //           }}
    //         >
    //           {item.title}
    //         </h3>
    //         <p>{item.description}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Forum;
