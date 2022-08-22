import React from "react";
import "./Signup.css";

const Signup = () => {
  return (
    <React.Fragment>
      <React.Fragment>
        <div className="login-div">
          <div className="signup-_main_div">
            <div className="signup-box">
              <h1>Sign up Here</h1>
              <form method="" action="">
                <div className="inputBox">
                  <label>name</label>
                  <input type="text" name="name" autoComplete="off" required />
                </div>
                <div className="inputBox">
                  <label>email</label>
                  <input type="text" name="email" autoComplete="off" required />
                </div>
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
                <div className="inputBox">
                  <label>passwordConfirm</label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="inputBox">
                  <label>role</label>
                  <input type="text" name="role" autoComplete="off" required />
                </div>
                <input type="submit" name="" value="Sign up" />
              </form>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </React.Fragment>
    </React.Fragment>
  );
};

export default Signup;
