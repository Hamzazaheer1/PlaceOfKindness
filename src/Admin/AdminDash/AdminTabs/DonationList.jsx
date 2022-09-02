import React, { useEffect, useState } from "react";

const DonationList = () => {
  let token;
  if (localStorage.token) {
    token = localStorage.getItem("token");
  }
  let bearer = "Bearer " + token;

  const [itemData, setItemData] = useState();
  let response;
  let responseData;
  const getItems = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/request/"
    );
    responseData = await response.json();
    setItemData(responseData.data);
  };

  useEffect(() => {
    getItems();
  }, []);

  console.log(responseData);

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
      console.log(response);
      if (response.status === 204) {
        alert("Request Deleted Sucessfully!!!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h3>List of Requested Donations by Needy</h3>

      <div>
        {itemData ? (
          itemData.map((item) => (
            <div style={{ border: "solid" }} key={item.id}>
              <p>{item.title}</p>
              <p>{item.amount}</p>
              <p>{item.createdAt}</p>
              <p>{item.paymentacc}</p>
              <p>{item.user[0].name}</p>
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
          <p>No data to be found</p>
        )}
      </div>
    </div>
  );
};

export default DonationList;
