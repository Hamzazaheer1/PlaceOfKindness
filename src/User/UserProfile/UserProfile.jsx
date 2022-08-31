import React from "react";
import { useEffect, useState } from "react";

let jwt;
if (localStorage.donator) {
  jwt = localStorage.getItem("donator");
} else if (localStorage.token) {
  jwt = localStorage.getItem("token");
} else if (localStorage.needy) {
  jwt = localStorage.getItem("needy");
}

const UserProfile = () => {
  const bearer = "Bearer " + jwt;

  const [currpassword, setCurrpassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcnfm, setPasswordcnfm] = useState("");
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

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/updatepassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            currentPassword: currpassword,
            password: password,
            passwordConfirm: passwordcnfm,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Password Changed Sucessfully!!");
      window.location = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
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
      <div>
        <h1>Update Password</h1>
        <h1>Enter your New Password</h1>
        <form>
          <p>Current Password</p>
          <input
            type="text"
            required
            onChange={(e) => setCurrpassword(e.target.value)}
          />
          <p>New Password</p>
          <input
            type="text"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <p>Password Confirm</p>
          <input
            type="text"
            required
            onChange={(e) => setPasswordcnfm(e.target.value)}
          />
        </form>
        <button onClick={submitHandler}>Reset Password</button>
      </div>
    </React.Fragment>
  );
};

export default UserProfile;
