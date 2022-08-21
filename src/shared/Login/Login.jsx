import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <React.Fragment>
      <div className="login-div">
        <div className="main_div">
          <div className="box">
            <h1>Sign in Here</h1>
            <form method="" action="">
              <div className="inputBox">
                <label>username</label>
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="inputBox">
                <label>password</label>
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  required
                />
              </div>
              <input type="submit" name="" value="login" />
            </form>
          </div>
        </div>
      </div>
      <br />
    </React.Fragment>
  );
};

export default Login;
