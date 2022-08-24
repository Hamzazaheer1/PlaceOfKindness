import React, { useContext, useState } from "react";
import { AuthContext } from "../ProtectedRoute/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const Navigate = useNavigate();
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
      console.log(responseData);
      auth.login() && Navigate("/userdash");

      // {
      //   auth.login() && Navigate("/userdash");
      // }
    } catch (err) {
      console.log(err);
    }
  };

  const auth = useContext(AuthContext);
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
          </div>
        </div>
      </div>
      <br />
    </React.Fragment>
  );
};

export default Login;
