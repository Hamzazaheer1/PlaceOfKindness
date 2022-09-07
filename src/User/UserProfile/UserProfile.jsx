import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

let jwt;
if (localStorage.donator) {
  jwt = localStorage.getItem("donator");
} else if (localStorage.token) {
  jwt = localStorage.getItem("token");
} else if (localStorage.needy) {
  jwt = localStorage.getItem("needy");
}

const UserProfile = () => {
  const bearer = "Bearer " + jwt;

  const [currpassword, setCurrpassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcnfm, setPasswordcnfm] = useState("");
  const [respData, setRespData] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

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

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/updatepassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            currentPassword: currpassword,
            password: password,
            passwordConfirm: passwordcnfm,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Password Changed Sucessfully!!");
      localStorage.removeItem("token");
      localStorage.removeItem("donator");
      localStorage.removeItem("needy");
      window.location = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  const profileUpdateHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (name) {
      formData.append("name", name);
    } else if (image) {
      formData.append("photo", image);
    }

    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/updateMe",
        {
          method: "PATCH",
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
      alert("Profile Updated Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={4} className="mt-2">
          <Card
            bg={"light"}
            border="danger"
            style={{ width: "18rem" }}
            className="mb-2 mt-5"
          >
            <img
              className="roundedCircle"
              src={respData.photo}
              alt="notFound"
              width="200px"
              style={{
                borderRadius: "50%",
                border: "solid",
                marginLeft: "3rem",
                marginTop: "1rem",
              }}
            />
            <Card.Body>
              <Card.Title> {respData.name}</Card.Title>
              <Card.Title>{respData.email}</Card.Title>
              <Card.Title> {respData.role}</Card.Title>
              <Card.Title> {respData.username}</Card.Title>
              <Card.Title> {respData.donated}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={1}></Col>
        <Col md={7} className="mt-5">
          <h2>Update Profile</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                onChange={(e) => setName(e.target.value)}
                placeholder={"Enter New Name"}
              />
              <br />
              <Form.Control
                type="file"
                required
                onChange={(e) => setImage(e.target.files[0])}
                placeholder={"Upload Image"}
              />
            </Form.Group>
            <Button variant="dark" onClick={profileUpdateHandler}>
              Submit
            </Button>
          </Form>
          <h2 className="mt-3">Update Password</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                required
                onChange={(e) => setCurrpassword(e.target.value)}
                placeholder={"Enter Current Password"}
              />
              <br />
              <Form.Control
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder={"Enter Password"}
              />
              <br />
              <Form.Control
                type="password"
                required
                onChange={(e) => setPasswordcnfm(e.target.value)}
                placeholder={"Re-Enter Password"}
              />
            </Form.Group>
            <Button variant="danger" onClick={submitHandler}>
              Reset Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
