import React from "react";
import { useNavigate } from "react-router-dom";

const SignupDash = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to Signup Page</h1>
      <h2>Whome would you like to signup as...</h2>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Donor
      </button>
      <button
        onClick={() => {
          navigate("/needysignup");
        }}
      >
        Needy
      </button>
    </div>
  );
};

export default SignupDash;
