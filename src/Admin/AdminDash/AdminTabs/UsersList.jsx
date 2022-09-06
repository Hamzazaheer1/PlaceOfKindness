import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
// import ListGroup from "react-bootstrap/ListGroup";
const UsersList = () => {
  let jwt;
  if (localStorage.token) {
    jwt = localStorage.getItem("token");
  }
  const bearer = "Bearer " + jwt;
  const [respData, setRespData] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getDonors = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/",
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

    getDonors();
  }, [bearer]);

  const userDeleteHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/users/${x}`,
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

  const updateRoleId = (a, b) => {
    setUserId(a);
    setUserRole(b);
  };

  const userUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            role: userRole,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Request Updated Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col md-5>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                <h2>Update User Role</h2>
              </Form.Label>
              <Form.Control placeholder="Role" disabled value={userRole} />
              <Form.Select onChange={(e) => setUserRole(e.target.value)}>
                <option>Select Users Role</option>
                <option value="donator">Donator</option>
                <option value="needy">Needy</option>
              </Form.Select>
            </Form.Group>
            <Button variant="dark" onClick={userUpdateHandler}>
              Update Role
            </Button>
          </Form>
        </Col>
        <Col md-7></Col>
      </Row>
      <Row>
        <h2>Users List</h2>
        {respData &&
          respData.map((item) => (
            <Card
              bg={"dark"}
              style={{
                width: "18rem",
                marginRight: "1rem",
                marginBottom: "1rem",
                color: "white",
              }}
            >
              <Card.Img
                variant="top"
                src={item.photo}
                alt={"this user image is not working"}
                width="50px"
                height={"250px"}
              />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.email}</Card.Text>
                <Card.Text>{item.username}</Card.Text>
                <Card.Text>{item.cnic}</Card.Text>
                <Card.Text>{item.role}</Card.Text>
              </Card.Body>
              <Card.Body>
                <Button
                  variant="primary"
                  style={{ marginRight: "1rem" }}
                  onClick={() => {
                    updateRoleId(item.id, item.role);
                  }}
                >
                  Update
                </Button>

                <Button
                  variant="danger"
                  onClick={() => {
                    userDeleteHandler(item.id);
                  }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
      </Row>
    </Container>
    // <div>
    //   <h1>Update User Role</h1>
    //   <div>
    //     <form>
    //       <input
    //         type="text"
    //         required
    //         onChange={(e) => setUserRole(e.target.value)}
    //         placeholder={"UserRole"}
    //         value={userRole}
    //       />
    //       <br />
    //       <button onClick={userUpdateHandler}>Update</button>
    //     </form>
    //   </div>
    //   <h1>Users List</h1>
    //   {respData &&
    //     respData.map((item) => (
    //       <div style={{ border: "solid", width: "50vw", marginBottom: "1rem" }}>
    //         <img
    //           src={item.photo}
    //           alt={"this user image is not working"}
    //           width="100px"
    //         />
    //         <p>{item.name}</p>
    //         <p>{item.email}</p>
    //         <p>{item.username}</p>
    //         <p>{item.cnic}</p>
    //         <p>{item.role}</p>
    //         <div style={{ display: "flex" }}>
    //           <p
    //             onClick={() => {
    //               updateRoleId(item.id, item.role);
    //             }}
    //             style={{
    //               boarder: "solid",
    //               backgroundColor: "grey",
    //               color: "white",
    //               width: "3vw",
    //             }}
    //           >
    //             Update
    //           </p>
    //           <p>&nbsp;&nbsp;</p>
    //           <p
    //             onClick={() => {
    //               userDeleteHandler(item.id);
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

export default UsersList;
