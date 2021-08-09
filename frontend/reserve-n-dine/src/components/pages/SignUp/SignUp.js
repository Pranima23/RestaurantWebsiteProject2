import React, { useState } from "react";
import { Button } from "../../Button";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../axios";
import "./Signup.css";
import axios from "axios";

function Register() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [repassword, setRepassword] = useState("");
  const history = useHistory("");

  const [userInfo, setUserInfo] = useState({
    email: "",
    phoneNo: "",
    password: "",
    rePassword: "",
    firstName: "",
    lastName: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const changeHandler = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const signup = (e) => {
    e.preventDefault();
    if (password === rePassword) {
      setPasswordError("");
      axios
        .post("api/users/", {
          email: email,
          phone_no: phoneNo,
          password: password,
          first_name: firstName,
          last_name: lastName,
        })
        .then((resUsers) => console.log(resUsers))
        .catch((errUsers) => console.log(errUsers));
    } else {
      setPasswordError("Passwords do not match");
    }
  };

  // async function SignUp(e){
  //   e.preventDefault();
  //   console.log('sign up form submitted')
  //   let item =({email: email, password: password, phone_no: "9865656565"})
  //   console.log(item)
  //   let result = await fetch("/api/users/",{
  //   method:"POST",
  //   body:JSON.stringify(item),
  //   headers:{
  //     "Content-type":'application/json',
  //     "Accept":'application/json'
  //   }
  // })
  //   result=await result.json()
  //   localStorage.setItem("user.info", JSON.stringify(result))
  //   // history.pushState('/');
  // }
  const { firstName, lastName, email, phoneNo, password, rePassword } =
    userInfo;

  return (
    <div className="footer-container1">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Register to our site to get the exclusive membership and recieve many
          offers and discount.
        </p>
        <br />
        <p className="footer-subscription-text">You can Logout at any time.</p>
        <div className="input-areas">
          <form onSubmit={signup}>
            <input
              className="footer-input"
              name="firstName"
              value={firstName}
              onChange={changeHandler}
              type="text"
              placeholder="Your First Name"
            />
            <input
              className="footer-input"
              name="lastName"
              value={lastName}
              onChange={changeHandler}
              type="text"
              placeholder="Your Last Name"
            />
            <input
              className="footer-input"
              name="email"
              value={email}
              onChange={changeHandler}
              type="email"
              placeholder="Your Email"
              required
            />
            <input
              className="footer-input"
              name="phoneNo"
              value={phoneNo}
              onChange={changeHandler}
              type="text"
              placeholder="Your Phone Number"
              required
            />
            <input
              className="footer-input"
              name="password"
              value={password}
              onChange={changeHandler}
              type="password"
              placeholder="Your Password"
              required
            />
            <input
              className="footer-input"
              name="rePassword"
              value={rePassword}
              onChange={changeHandler}
              type="password"
              placeholder="Confirm Password"
              required
            />
            <Button buttonStyle="btn--outline">SignUp</Button>
            <br />
          </form>
          {passwordError}
          <br />
          <p className="footer-subscription-text">Thank you for Signing Up.</p>
        </div>
      </section>
      <br></br>
    </div>
  );
}

export default Register;
