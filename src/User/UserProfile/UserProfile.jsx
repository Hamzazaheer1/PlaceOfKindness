import React from "react";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const token = localStorage.getItem("token");
  const bearer = "Bearer " + token;

  const [respData, setRespData] = useState([]);
  let response;
  let responseData;
  const getProfile = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/users/getme",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      }
    );
    responseData = await response.json();
    setRespData(responseData.data.data);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div style={{ marginLeft: "2rem", marginTop: "1rem" }}>
      <h1>User Profile</h1>
      <h2>{respData.photo}</h2>
      <p>{respData.name}</p>
      <p>{respData.email}</p>
      <p>{respData.role}</p>
      <p>{respData.username}</p>
      {/* <p>{respData.requestlimit}</p>  needy*/}
      {/* <p>{respData.cninc}</p>  needy*/}
      <p>{respData.donated}</p>
      {/* <p>{respData.posts.length}</p>
      <p>{respData.items.length}</p> */}
    </div>
  );
};

export default UserProfile;
