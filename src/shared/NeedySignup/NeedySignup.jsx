import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState(null);
  const [cnic, setCnic] = useState(null);

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://placeofkindness-server.herokuapp.com/api/v1/users/signupneedy",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            username: username,
            password: password,
            passwordConfirm: passwordConfirm,
            role: "needy",
            cnic: cnic,
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        throw new Error(responseData.message);
      }
      alert("Needy Account has been created!!!");
      // console.log(responseData);

      // auth.login();
    } catch (err) {
      console.log(err);
      // setIsLoading(false);
      // setError(err.message || "Something went wrong please try again!");
    }
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <div className="login-div">
          <div className="signup-_main_div">
            <div className="signup-box">
              <h1>Sign up Here</h1>
              <form>
                <div className="inputBox">
                  <label>name</label>
                  <input
                    type="text"
                    name="name"
                    autoComplete="off"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <label>email</label>
                  <input
                    type="text"
                    name="email"
                    autoComplete="off"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
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
                <div className="inputBox">
                  <label>passwordConfirm</label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    autoComplete="off"
                    required
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                </div>
                <div className="inputBox">
                  <label>CNIC</label>
                  <input
                    type="text"
                    name="cnic"
                    autoComplete="off"
                    required
                    onChange={(e) => setCnic(e.target.value)}
                  />
                </div>
              </form>
              <button inverse onClick={authSubmitHandler}>
                Sign up
              </button>
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
