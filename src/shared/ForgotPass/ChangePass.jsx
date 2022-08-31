import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ChangePass = () => {
  const [password, setPassword] = useState("");
  const [passwordcnfm, setPasswordcnfm] = useState("");

  let { token } = useParams();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://placeofkindness-server.herokuapp.com/api/v1/users/resetpassword/${token}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
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
    <div>
      <div>
        <h1>Enter your New Password</h1>
        <form>
          <p>Password</p>
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
    </div>
  );
};

export default ChangePass;
