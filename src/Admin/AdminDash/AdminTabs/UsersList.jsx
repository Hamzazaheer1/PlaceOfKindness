import React, { useState, useEffect } from "react";

const UsersList = () => {
  let jwt;
  if (localStorage.token) {
    jwt = localStorage.getItem("token");
  }
  const [respData, setRespData] = useState([]);
  const bearer = "Bearer " + jwt;

  let response;
  let responseData;
  const getDonors = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/users/",
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
    getDonors();
  }, []);
  console.log(respData);

  return (
    <div>
      <h1>Users List</h1>
      {respData &&
        respData.map((item) => (
          <div style={{ border: "solid", width: "50vw", marginBottom: "1rem" }}>
            <img
              src={item.photo}
              alt={"this user image is not working"}
              width="100px"
            />
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.username}</p>
            <p>{item.cnic}</p>
            <p>{item.role}</p>
          </div>
        ))}
    </div>
  );
};

export default UsersList;
