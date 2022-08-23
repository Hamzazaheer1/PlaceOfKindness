import React, { useEffect, useState } from "react";
import "./TopDonors.css";

const TopDonors = () => {
  const [name, setName] = useState([]);

  // useEffect(() => {
  //   const sendRequest = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://placeofkindness-server.herokuapp.com/api/v1/donations/top3don"
  //       );
  //       const responseData = await response.json(response);
  //       if (!response.ok) {
  //         throw new Error(responseData.message);
  //       }
  //       // console.log(responseData.users[0].name);
  //       setName(responseData);
  //       console.log(name);
  //       // console.log(name);
  //       //console.log(name);
  //       // console.log(name);
  //       // console.log(name[0]);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   sendRequest();
  // }, []);
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
  }, []);

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
      <div className="container">
        <ul className="card card0">
          {name.map((name) => (
            <li key={name.id}>{name.name}</li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default TopDonors;
