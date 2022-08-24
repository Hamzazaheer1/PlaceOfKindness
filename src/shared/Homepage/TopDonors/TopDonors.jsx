import React, { useEffect, useState } from "react";
import "./TopDonors.css";

const TopDonors = () => {
  const [name, setName] = useState([]);

  let response;
  let responseData;
  const getDonors = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/donations/top3don"
    );
    responseData = await response.json();
    setName(responseData.users);
  };

  useEffect(() => {
    getDonors();
  });

  return (
    <React.Fragment>
      <h2 className="top-donors-h2">Our Top Donors.</h2>
      {/* <div className="container">
        <div className="card card0">
          <div className="border"></div>
          <h1 className="top-donors-h1"></h1>
        </div>

        <div className="card card1">
          <div className="border"></div>
        </div>
        <div className="card card2">
          <div className="border"></div>
        </div>
      </div> */}
      <div className="donor-container">
        <ul style={{ marginBottom: "2rem" }}>
          {name.map((name) => (
            <li
              style={{
                display: "inline",
                marginLeft: "15rem",
                fontWeight: "bold",
                fontStyle: "oblique",
                fontSize: "20px",
              }}
              key={name.id}
            >
              <img
                width={"100px"}
                src="https://i.pinimg.com/736x/8f/a0/51/8fa051251f5ac2d0b756027089fbffde--terry-o-neill-al-pacino.jpg"
                alt="not load"
              />
              <div
                style={{
                  display: "inline",
                  marginLeft: "1rem",
                  marginRight: "5rem",
                }}
              >
                {name.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default TopDonors;
