import React, { useContext, useState } from "react";
import "./login.scss";
import { LoginContext } from "../../context/loginContext";
import Swal from "sweetalert2";

const Login = () => {
  const { handleLogin } = useContext(LoginContext || {});

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      username === process.env.REACT_APP_USERNAME &&
      password === process.env.REACT_APP_PASSWORD
    ) {
      localStorage.setItem("username", JSON.stringify(username));
      handleLogin();
      Swal.fire("Success", "Logged in successfully", "success");
    } else {
      Swal.fire("Error", "Credentials Didn't match", "error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-form__title">BU Science Club</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-form__input"
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="login-form__input"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-form__submit" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
