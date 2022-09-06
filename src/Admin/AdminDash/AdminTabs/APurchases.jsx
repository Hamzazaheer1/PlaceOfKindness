import React, { useState, useEffect } from "react";

const APurchases = () => {
  let jwt;
  if (localStorage.token) {
    jwt = localStorage.getItem("token");
  }
  const bearer = "Bearer " + jwt;

  const [respData, setRespData] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/needyitem/unshipped",
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

    getItems();
  }, [bearer]);

  const commentUpdateHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/needyitem//itemshiptoneedy/${x}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Item Shipped Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Admin Purchases Panel</h1>
      <br />
      <h1>UnShipped Items</h1>
      {console.log(respData)}
      {respData ? (
        respData.map((item) => (
          <div style={{ border: "solid" }}>
            {item.item.map((i) => (
              <h5>{i}</h5>
            ))}
            <h5>{item.shipaddress}</h5>
            {item.shipped ? <h5>Shipped</h5> : <h5>Not Shipped</h5>}
            <h5>{item.user[0]}</h5>
            <h5>{item.createdAt}</h5>
            <div style={{ display: "flex" }}>
              <p
                onClick={() => {
                  commentUpdateHandler(item._id);
                }}
                style={{
                  boarder: "solid",
                  backgroundColor: "grey",
                  color: "white",
                  width: "3vw",
                }}
              >
                Update
              </p>
            </div>
          </div>
        ))
      ) : (
        <h5>no data found</h5>
      )}
    </div>
  );
};

export default APurchases;
