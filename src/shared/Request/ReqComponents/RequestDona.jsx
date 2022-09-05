import React, { useEffect, useState } from "react";

const RequestDona = () => {
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

  return (
    <div>
      <h1>Requested Donations by Needy</h1>

      <div>
        {itemData &&
          itemData.map((item) => (
            <div style={{ border: "solid" }}>
              <p>{item.title}</p>
              <p>
                {item.amount}
                <b>pkr</b>
              </p>
              <p>{item.description}</p>
              <p>{item.createdAt}</p>
              <p>{item.paymentacc}</p>
              <p>{item.user[0].name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RequestDona;
