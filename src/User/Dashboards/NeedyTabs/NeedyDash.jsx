import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const NeedyDash = () => {
  let token;
  if (localStorage.needy) {
    token = localStorage.getItem("needy");
  }
  let bearer = "Bearer " + token;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentAc, setPaymentAc] = useState("");
  const [respData, setRespData] = useState([]);

  const reqDonationHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/request/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            title: title,
            description: description,
            amount: amount,
            paymentacc: paymentAc,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Donation request has been submitted!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  const reqDeleteHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/request/${x}`,
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
      setRespData(responseData.data.requests);
    };

    getProfile();
  }, [bearer]);

  return (
    <div>
      <h1>Welcome to Needy Panel</h1>
      <Container>
        <br />
        <Form>
          <h2>Request Item</h2>
          <br />
          <Form.Group className="mb-3" controlId="address">
            <Form.Control
              type="text"
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Enter Title"}
            />
            <br />
            <Form.Control
              type="text"
              required
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Enter description"}
            />
            <br />
            <Form.Control
              type="text"
              required
              onChange={(e) => setAmount(e.target.value)}
              placeholder={"Enter Amount"}
            />
            <br />
            <Form.Control
              type="text"
              required
              onChange={(e) => setPaymentAc(e.target.value)}
              placeholder={"Enter Payment Receive Account"}
            />
            <br />
          </Form.Group>
          <Button variant="dark" onClick={reqDonationHandler}>
            Submit
          </Button>
        </Form>
        <br />
        <br />
        <h2>List of Requests</h2>
        {respData ? (
          respData.map((item, index) => (
            <Alert variant={"dark"} key={index + 1}>
              <b>{item.title}</b>
              <p>{item.description}</p>
              <p>{item.amount}</p>
              <p>{item.paymentacc}</p>
              <Button
                variant="danger"
                onClick={() => {
                  reqDeleteHandler(item.id);
                }}
              >
                Delete
              </Button>
            </Alert>
          ))
        ) : (
          <h4>No Requests Found</h4>
        )}
      </Container>
    </div>
    //old
    // <div>
    //   <h1>Welcome to Needy Dashboard</h1>
    //   <div>
    //     <h3>Request Donation(Money)</h3>
    //     <div>
    //       <form>
    //         <input
    //           type="text"
    //           required
    //           onChange={(e) => setTitle(e.target.value)}
    //           placeholder={"Enter Title"}
    //         />
    //         <br />
    //         <input
    //           type="text"
    //           required
    //           onChange={(e) => setDescription(e.target.value)}
    //           placeholder={"Enter description"}
    //         />
    //         <br />
    //         <input
    //           type="text"
    //           required
    //           onChange={(e) => setAmount(e.target.value)}
    //           placeholder={"Enter Amount"}
    //         />
    //         <br />
    //         <input
    //           type="text"
    //           required
    //           onChange={(e) => setPaymentAc(e.target.value)}
    //           placeholder={"Enter Payment Receive Account"}
    //         />
    //         <br />
    //         <button onClick={reqDonationHandler}>Submit</button>
    //       </form>
    //     </div>
    //   </div>
    //   <br />

    //   <br />
    //   <h3>Requested Donations by Needy</h3>
    //   {respData ? (
    //     respData.map((item) => (
    //       <div
    //         style={{ marginLeft: "2rem", marginTop: "1rem", border: "solid" }}
    //       >
    //         <p>{item.title}</p>
    //         <p>{item.description}</p>
    //         <p>{item.amount}</p>
    //         <p>{item.paymentacc}</p>
    //         <p
    //           onClick={() => {
    //             reqDeleteHandler(item.id);
    //           }}
    //           style={{
    //             boarder: "solid",
    //             backgroundColor: "grey",
    //             color: "white",
    //             width: "3vw",
    //           }}
    //         >
    //           Delete
    //         </p>
    //       </div>
    //     ))
    //   ) : (
    //     <p>no data found</p>
    //   )}
    // </div>
  );
};

export default NeedyDash;
