/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useStores } from "../../contexts/storeContext";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import { useNavigate } from "react-router-dom";

function LoginPopup({ setShowLogin }) {
  const { url, setToken } = useStores();
  const [currState, setCurrState] = useState("Login");
  const [regMessage, setRegMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const createAccountHandler = () => {
    setCurrState("Sign up");
    setLoginError("");
    setRegMessage("");
    setErrMessage("");
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // const handleCreateAccount = (e) => {
  //   e.preventDefault();
  //   setLoginError("");
  // };

  const onLogin = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      let newUrl = url;
      let response;
      if (currState === "Login") {
        newUrl += "/api/admin/login";
        response = await axios.post(newUrl, data);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/add");
        } else {
          setErrMessage("");
          setRegMessage("");
          setLoginError(response.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }

    // else {
    //   newUrl += "/api/user/register";
    //   response = await axios.post(newUrl, data);
    //   if (response.data.success) {
    //     setRegMessage("registered successfully");
    //     setCurrState("Login");
    //     setErrMessage("");
    //   } else {
    //     setErrMessage(response.data.message);
    //   }
    // }
  };
  console.log(errMessage, regMessage);
  if (isLoading)
    return (
      <div className="loadingComponent">
        <FadeLoader color="#FF6347" loading={isLoading} size={50} />
      </div>
    );
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        {loginError && (
          <div className="reg-message-container">
            <img src="error.webp" />
            <p className="error-message">{loginError}</p>
          </div>
        )}
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
          <h2 className="title">{currState}</h2>
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
      </form>
    </div>
  );
}

export default LoginPopup;

// {
//   currState === "Login" ? (
//     <p>
//       {/* () => setCurrState("Sign up") */}
//       Create a new account?{" "}
//       <span onClick={createAccountHandler}>Click here</span>
//     </p>
//   ) : (
//     <p>
//       Already have an account?{" "}
//       <span onClick={() => setCurrState("Login")}> Login here</span>
//     </p>
//   );
// }
