/* eslint-disable react/prop-types */
import { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useStores } from "../../contexts/storeContext";
import axios from "axios";

function LoginPopup({ setShowLogin }) {
  const { url, setToken } = useStores();
  const [currState, setCurrState] = useState("Login");
  const [regMessage, setRegMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    let response;
    if (currState === "Login") {
      newUrl += "/api/user/login";
      response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.mesage);
      }
    } else {
      newUrl += "/api/user/register";
      response = await axios.post(newUrl, data);
      if (response.data.success) {
        setRegMessage("registered successfully");
        setCurrState("Login");
        setErrMessage("");
      } else {
        setErrMessage(response.data.message);
      }
    }
  };
  console.log(errMessage, regMessage);
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        {errMessage ? (
          <div className="reg-message-container">
            <img src="error.webp" />
            <p className="error-message">{errMessage}</p>
          </div>
        ) : (
          regMessage && (
            <div className="reg-message-container">
              <img src="right-icon.png" />
              <p className="reg-message">{regMessage} 🎉</p>
            </div>
          )
        )}

        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="your name"
              required
            />
          )}

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-conditions">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}> Login here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
