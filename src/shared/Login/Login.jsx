import React, { useState } from "react";
import DonarDash from "../../User/Dashboards/DonarDash";

import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: username,
            password: password,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert(responseData.data.role);
      if (responseData.data.role === "donator") {
        localStorage.setItem("donator", responseData.token);
        window.location = "/donordash";
      } else if (responseData.data.role === "needy") {
        localStorage.setItem("needy", responseData.token);
        window.location = "/needydash";
      } else if (responseData.data.role === "unverified") {
        alert("Not Verified yet....");
      } else {
        localStorage.setItem("token", responseData.token);
        window.location = "/admindash";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const forgotHandler = () => {
    window.location = "/forgotpass";
  };

  return (
    <React.Fragment>
      <div className="login-div">
        <div className="main_div">
          <div className="login-box">
            <h1>Sign in Here</h1>
            <form method="" action="">
              <div className="inputBox">
                <label>username</label>
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="inputBox">
                <label>password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </form>
            <button onClick={authSubmitHandler}>Sign in</button>
            <p style={{ color: "white" }} onClick={forgotHandler}>
              Forgot Password
            </p>
          </div>
        </div>
      </div>
      <br />
    </React.Fragment>
  );
};

export default Login;
