/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { assets } from "../../assets/assets";
import { useStores } from "../../contexts/storeContext";
import axios from "axios";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  // const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const { url } = useStores();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url + "/api/email/receive-email", {
        email,
        name,
        message,
      });
      setResponseMessage(response.message);
      setEmail("");
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="contact-container" id="contact">
      <div className="contact-image-container">
        <img src="right_img.png" />
      </div>
      <div className="contact-content-container">
        <form onSubmit={handleSubmit}>
          <div className="name-container">
            <label htmlFor="name">name</label>
            <input
              name="name"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>
          <div className="email-container">
            <label htmlFor="email">email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your E-mail Address"
              required
            />
          </div>
          <div className="textarea-container">
            <label htmlFor="message">Message</label>
            <textarea
              placeholder="Your Message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="contact-btn-container">
            <button type="submit" className="contact-btn">
              Send
            </button>
          </div>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </div>
    </div>
  );
}

export default Contact;
