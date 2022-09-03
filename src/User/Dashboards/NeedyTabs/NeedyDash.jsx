import React, { useState, useEffect } from "react";

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
  const [reqId, setReqId] = useState("");

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

  // const updateReqHandler = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await fetch(
  //       `https://placeofkindness-server.herokuapp.com/api/v1/request/${reqId}`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: bearer,
  //         },
  //         body: JSON.stringify({
  //           title: title,
  //           description: description,
  //           amount: amount,
  //           paymentacc: paymentAc,
  //         }),
  //       }
  //     );

  //     const responseData = await response.json();
  //     if (!response.ok) {
  //       alert(responseData.message);
  //       throw new Error(responseData.message);
  //     }
  //     alert("Request Updated Sucessfully!!!!");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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

  useEffect(() => {
    getProfile();
  }, []);

  // const updateReqId = (a, b, c, d, e) => {
  //   setReqId(a);
  //   setTitle(b);
  //   setDescription(c);
  //   setAmount(d);
  //   setPaymentAc(e);
  // };

  return (
    <div>
      <h1>Welcome to Needy Dashboard</h1>
      <div>
        <h3>Request Donation(Money)</h3>
        <div>
          <form>
            <input
              type="text"
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Enter Title"}
            />
            <br />
            <input
              type="text"
              required
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Enter description"}
            />
            <br />
            <input
              type="text"
              required
              onChange={(e) => setAmount(e.target.value)}
              placeholder={"Enter Amount"}
            />
            <br />
            <input
              type="text"
              required
              onChange={(e) => setPaymentAc(e.target.value)}
              placeholder={"Enter Payment Receive Account"}
            />
            <br />
            <button onClick={reqDonationHandler}>Submit</button>
          </form>
        </div>
      </div>
      <br />
      {/* <div>
        <h3>Update Existing Request</h3>
        <div>
          <form>
            <input
              type="text"
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Enter Title"}
              value={title}
            />
            <br />
            <input
              type="text"
              required
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Enter description"}
              value={description}
            />
            <br />
            <input
              type="text"
              required
              onChange={(e) => setAmount(e.target.value)}
              placeholder={"Enter Amount"}
              value={amount}
            />
            <br />
            <input
              type="text"
              required
              onChange={(e) => setPaymentAc(e.target.value)}
              placeholder={"Enter Payment Receive Account"}
              value={paymentAc}
            />
            <br />
            <button onClick={updateReqHandler}>Update</button>
          </form>
        </div>
      </div> */}
      <br />
      <h3>Requested Donations by Needy</h3>
      {respData ? (
        respData.map((item) => (
          <div
            style={{ marginLeft: "2rem", marginTop: "1rem", border: "solid" }}
          >
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.amount}</p>
            <p>{item.paymentacc}</p>
            <p
              onClick={() => {
                reqDeleteHandler(item.id);
              }}
              style={{
                boarder: "solid",
                backgroundColor: "grey",
                color: "white",
                width: "3vw",
              }}
            >
              Delete
            </p>
          </div>
        ))
      ) : (
        <p>no data found</p>
      )}
    </div>
  );
};

export default NeedyDash;
