import React, { useState } from "react";

const ForgotPass = () => {
  const [email, setEmail] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/forgotpassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Password reset email sent to your email Sucessfully!!");
      window.location = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Forgot Pass</h1>
      <form>
        <p>Enter email</p>
        <input
          type="text"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </form>
      <button onClick={submitHandler}>Reset Password</button>
    </div>
  );
};

export default ForgotPass;
