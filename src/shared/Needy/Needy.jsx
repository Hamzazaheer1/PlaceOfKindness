import React from "react";
import { useState, useEffect } from "react";
import defaultimg from "../../image/default.jpg";

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
            <img src={item.photo} alt={defaultimg} width="100px" />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Needy;
