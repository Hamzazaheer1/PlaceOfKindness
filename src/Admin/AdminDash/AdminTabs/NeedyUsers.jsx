import React, { useState, useEffect } from "react";

const NeedyUsers = () => {
  let jwt;
  if (localStorage.token) {
    jwt = localStorage.getItem("token");
  }
  const bearer = "Bearer " + jwt;

  const [respData, setRespData] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");

  let response;
  let responseData;
  const getDonors = async () => {
    response = await fetch(
      "https://placeofkindness-server.herokuapp.com/api/v1/users/unverifiedneedy",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      }
    );
    responseData = await response.json();
    console.log(responseData);
    setRespData(responseData.data);
  };

  useEffect(() => {
    getDonors();
  }, []);

  const updateRoleId = (a, b) => {
    setUserRole(b);
    setUserId(a);
  };

  const userUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            role: userRole,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Request Updated Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Give User Role</h1>
      <div>
        <form>
          <input
            type="text"
            required
            onChange={(e) => setUserRole(e.target.value)}
            placeholder={"UserRole"}
            value={userRole}
          />
          <br />
          <button onClick={userUpdateHandler}>Update</button>
        </form>
      </div>
      <h1>List of Unvarified Needy Users</h1>
      {respData &&
        respData.map((item) => (
          <div style={{ border: "solid" }}>
            <p>{item.name}</p>
            <p>{item.email}</p>
            <p>{item.username}</p>
            <p>{item.cnic}</p>
            <p>{item.temprole}</p>
            <p>{item.role}</p>
            <p>{item.requestlimit}</p>
            <p>{item.donated}</p>
            <p
              onClick={() => {
                updateRoleId(item._id, item.role);
              }}
              style={{
                boarder: "solid",
                backgroundColor: "grey",
                color: "white",
                width: "8vw",
              }}
            >
              Update Needy Role
            </p>
          </div>
        ))}
    </div>
  );
};

export default NeedyUsers;
