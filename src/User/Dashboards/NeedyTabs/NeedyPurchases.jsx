import React, { useState, useEffect } from "react";

const NeedyPurchases = () => {
  let token;
  if (localStorage.needy) {
    token = localStorage.getItem("needy");
  }
  let bearer = "Bearer " + token;

  // const [userId, setUserId] = useState("");
  const [spent, setRespDataSpent] = useState([]);
  const [unspent, setRespDataUnspent] = useState([]);

  // const getUserID = async () => {
  //   const response = await fetch(
  //     "https://placeofkindness-server.herokuapp.com/api/v1/users/getme",
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: bearer,
  //       },
  //     }
  //   );
  //   const responseData = await response.json();
  //   setUserId(responseData.data.id);
  // };

  const getUnsentItems = async () => {
    const response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/needyitem/needyunsentitems",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      }
    );
    const responseData = await response.json();
    // console.log("un sent is ", responseData);
    setRespDataUnspent(responseData.data);
  };

  const getSentItems = async () => {
    const response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/needyitem/needysentitems",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      }
    );
    const responseData = await response.json();
    // console.log("needy sent items is ", responseData);
    setRespDataSpent(responseData.data.requests);
  };

  useEffect(() => {
    getUnsentItems();
    getSentItems();
  }, []);

  return (
    <div>
      <h1>NeedyPurchases</h1>
      <div style={{ display: "inline-flex" }}>
        <div>
          <h1>Needy Sent Items</h1>
          {spent ? (
            spent.map((item) => (
              <div>
                <h5>item1</h5>
              </div>
            ))
          ) : (
            <h5>No item found</h5>
          )}
        </div>
        <div style={{ marginLeft: "50rem" }}>
          <h1>Needy Un-Sent Items</h1>
          {unspent ? (
            unspent.map((item) => (
              <div>
                <h5>{item.createdAt}</h5>
                {item.shipped ? <h5>"Shipped"</h5> : <h5>UnShipped</h5>}
                <h5>{item.shipaddress}</h5>
                <h5>{item.createdAt}</h5>
              </div>
            ))
          ) : (
            <h5>No item found</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeedyPurchases;
