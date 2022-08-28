import React from "react";
import { useState, useEffect } from "react";

const Needy = () => {
  const [respData, setRespData] = useState([]);

  let response;
  let responseData;
  const getDonors = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/users/needyusers"
    );
    responseData = await response.json();
    setRespData(responseData.data.body);
    console.log(respData);
  };

  useEffect(() => {
    getDonors();
  });

  return (
    <div style={{ marginLeft: "2rem", marginTop: "1rem" }}>
      <h1>Needy</h1>
      <div>
        {respData.map((item) => (
          <div>
            <p>{item.photo}</p>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Needy;
