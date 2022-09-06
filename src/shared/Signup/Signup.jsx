import React, { useState } from "react";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Signup = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            username: username,
            password: password,
            passwordConfirm: passwordConfirm,
            role: "donator",
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert(responseData.message);
      console.log(responseData);
      window.location = "/login";
      // auth.login();
    } catch (err) {
      console.log(err);
      // setIsLoading(false);
      // setError(err.message || "Something went wrong please try again!");
    }
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <div style={{ marginTop: "5rem", marginBottom: "12rem" }}>
            <Form>
              <h1>Donor Sign Up</h1>
              <Form.Group className="mb-3 mt-4" controlId="Email">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email or username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password Again"
                  required
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </Form.Group>
              <Button variant="dark" inverse onClick={authSubmitHandler}>
                Signup
              </Button>
            </Form>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
    // <React.Fragment>
    //   <React.Fragment>
    //     <div className="login-div">
    //       <div className="signup-_main_div">
    //         <div className="signup-box">
    //           <h1>Sign up Here</h1>
    //           <form>
    //             <div className="inputBox">
    //               <label>name</label>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 autoComplete="off"
    //                 required
    //                 onChange={(e) => setName(e.target.value)}
    //               />
    //             </div>
    //             <div className="inputBox">
    //               <label>email</label>
    //               <input
    //                 type="text"
    //                 name="email"
    //                 autoComplete="off"
    //                 required
    //                 onChange={(e) => setEmail(e.target.value)}
    //               />
    //             </div>
    //             <div className="inputBox">
    //               <label>username</label>
    //               <input
    //                 type="text"
    //                 name="username"
    //                 autoComplete="off"
    //                 required
    //                 onChange={(e) => setUsername(e.target.value)}
    //               />
    //             </div>
    //             <div className="inputBox">
    //               <label>password</label>
    //               <input
    //                 type="password"
    //                 name="password"
    //                 autoComplete="off"
    //                 required
    //                 onChange={(e) => setPassword(e.target.value)}
    //               />
    //             </div>
    //             <div className="inputBox">
    //               <label>passwordConfirm</label>
    //               <input
    //                 type="password"
    //                 name="passwordConfirm"
    //                 autoComplete="off"
    //                 required
    //                 onChange={(e) => setPasswordConfirm(e.target.value)}
    //               />
    //             </div>
    //           </form>
    //           <button inverse onClick={authSubmitHandler}>
    //             Sign up
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //     <br />
    //   </React.Fragment>
    // </React.Fragment>
  );
};

export default Signup;
