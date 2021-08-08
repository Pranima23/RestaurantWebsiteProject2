import React, { useState, useEffect } from "react";
import { Button } from "../../Button";
import { useHistory } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  function login(e) {
    e.preventDefault();
    console.log("Trying to log in...");
    console.log(userInfo);
    axios
      .put("api-auth/login", userInfo)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const history = useHistory();
  // console.log("email", email);
  // console.log("password", password);
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/menu");
    }
  }, []);
  // async function login() {
  //   console.log("Trying to log in....");
  //   let item = { email: email, password: password };
  //   console.log(item);
  //   let result = await fetch("/api-auth/login/", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify(item),
  //   });
  //   result = await result.json();
  //   console.log("Result login", result);
  //   localStorage.setItem("user-info", JSON.stringify(result));
  //   history.push("/menu");
  // }
  return (
    <div className="footer-container1">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Visit our site to get the exclusive membership and recieve many offers
          and discount
        </p>
        <br />
        <p className="footer-subscription-text">You can Logout at any time.</p>
        <div className="input-areas">
          <form onSubmit={login}>
            <input
              className="footer-input"
              name="email"
              value={userInfo.email}
              onChange={changeHandler}
              type="email"
              placeholder="Your Email"
            />
            <input
              className="footer-input"
              name="password"
              value={userInfo.password}
              onChange={changeHandler}
              type="password"
              placeholder="Your password"
            />
            <Button buttonStyle="btn--outline">Login </Button>
          </form>
        </div>
      </section>
      <br></br>
    </div>
  );
}

export default Login;
