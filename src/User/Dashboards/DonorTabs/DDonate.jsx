import React, { useState, useEffect } from "react";

const DDonate = () => {
  let token;
  if (localStorage.donator) {
    token = localStorage.getItem("donator");
  }
  const bearer = "Bearer " + token;
  const [amount, setAmount] = useState(0);
  const [respData, setRespData] = useState([]);

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

  useEffect(() => {
    donationHandler();
  }, [bearer]);

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
    </div>
  );
};

export default DDonate;
