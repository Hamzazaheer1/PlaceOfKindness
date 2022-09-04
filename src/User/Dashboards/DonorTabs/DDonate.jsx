import React, { useState, useEffect } from "react";

const DDonate = () => {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  // setParam1(urlParams.get("user"));
  // setParam2(urlParams.get("amount"));
  const [param1, setParam1] = useState(urlParams.get("user"));
  const [param2, setParam2] = useState(urlParams.get("amount"));
  console.log(param1);
  console.log(param2);

  let token;
  if (localStorage.donator) {
    token = localStorage.getItem("donator");
  }
  const bearer = "Bearer " + token;
  const [amount, setAmount] = useState(0);
  const [respData, setRespData] = useState([]);
  const [donationRespData, setDonationRespData] = useState([]);

  const donationHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://placeofkindness-server.herokuapp.com/api/v1/donations/checkoutsession/${amount}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      }
    );
    const responseData = await response.json();
    setRespData(responseData.url);
    console.log(respData);
    window.open(respData, "_blank");
  };

  const confirmDonation = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/donations/create-donations/?user=${param1}&amount=${param2}`,
        {
          method: "POST",
          headers: {
            Authorization: bearer,
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        console.log(response);
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Donation Send Sucessfully Sucessfully!!!!");
      setDonationRespData(responseData.donation);
      console.log(responseData.donation);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Donate to Place of Kindness Directly</h1>
      <form>
        <input
          type="number"
          required
          onChange={(e) => setAmount(e.target.value)}
          placeholder={"Enter Amount"}
        />
        <br />
        <br />
        <button onClick={donationHandler}>Submit</button>
        <br />
      </form>

      <button onClick={confirmDonation}>View Data of Table</button>
      {console.log(donationRespData)}
      {donationRespData &&
        donationRespData.map((item, index) => (
          <div style={{ border: "solid" }}>
            <h5>{index + 1}</h5>
            <h5>{item.amount}</h5>
            <h5>{item.createdAt}</h5>
          </div>
        ))}
      {/* <div>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Photo</th>
              <th>Amount</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            <tbody>
              {donationRespData.map((item, index) => {
                if (item) {
                  {
                    setParam1("");
                    setParam2(0);
                  }
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={item.user.photo}
                          alt=""
                          style={{ width: "50px" }}
                        />
                      </td>
                      <td>{item.amount}</td>
                      <td>{item.createdAt}</td>
                    </tr>
                  );
                } else {
                  return <h5>No data found</h5>;
                }
              })}
            </tbody>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default DDonate;
