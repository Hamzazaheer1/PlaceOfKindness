import React, { useState, useEffect } from "react";

const UsersList = () => {
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
      "https://placeofkindness-server.herokuapp.com/api/v1/users/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
      }
    );
    responseData = await response.json();
    setRespData(responseData.data);
  };

  useEffect(() => {
    getDonors();
  }, []);

  const userDeleteHandler = async (x) => {
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/users/${x}`,
        {
          method: "DELETE",
          headers: {
            Authorization: bearer,
          },
        }
      );

      if (response.status === 204) {
        alert("Request Deleted Sucessfully!!!!");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      <h1>Update User Role</h1>
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
            <div style={{ display: "flex" }}>
              <p
                onClick={() => {
                  updateRoleId(item.id, item.role);
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
              <p>&nbsp;&nbsp;</p>
              <p
                onClick={() => {
                  userDeleteHandler(item.id);
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
          </div>
        ))}
    </div>
  );
};

export default UsersList;
