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
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/getme",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
        }
      );
      const responseData = await response.json();
      setRespData(responseData.data);
    };

    getProfile();
  }, [bearer]);

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

  const profileUpdateHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("photo", image);
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/updateMe",
        {
          method: "PATCH",
          headers: {
            Authorization: bearer,
          },
          body: formData,
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        console.log(response);
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Profile Updated Sucessfully!!!!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div style={{ marginLeft: "2rem", marginTop: "1rem" }}>
        <h1>User Profile</h1>
        <img src={respData.photo} alt="notFound" width="100px" />
        <p>{respData.name}</p>
        <p>{respData.email}</p>
        <p>{respData.role}</p>
        <p>{respData.username}</p>
        <p>{respData.donated}</p>
      </div>

      <br />
      <div>
        <h2>Update Profile</h2>
        <form encType="multipart/form-data">
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            placeholder={"Enter New Name"}
          />
          <br />
          <br />
          <input
            type="file"
            required
            onChange={(e) => setImage(e.target.files[0])}
            placeholder={"Upload Image"}
          />
          <br />
          <br />
          <button onClick={profileUpdateHandler}>Submit</button>
          <br />
          <br />
          <br />
        </form>
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
