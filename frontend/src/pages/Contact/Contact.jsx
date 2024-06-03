/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

import { assets } from "../../assets/assets";
import { useStores } from "../../contexts/storeContext";
import axios from "axios";
import "./Contact.css";

function Contact({ setShowLogin }) {
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

  return (
    <div className="contact-container">
      <div className="contact-image-container">
        <img src="contacts.png" />
      </div>
      <div className="contact-content-container">
        <form>
          <div className="name-container">
            <label htmlFor="name">name</label>
            <input
              name="name"
              type="text"
              id="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="email-container">
            <label htmlFor="email">email</label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Your E-mail Address"
              required
            />
          </div>
          <div className="textarea-container">
            <label htmlFor="message">Message</label>
            <textarea placeholder="Your Message" required></textarea>
          </div>

          <div className="contact-btn-container">
            <button type="submit" className="contact-btn">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
