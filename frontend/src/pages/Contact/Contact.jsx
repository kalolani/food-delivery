/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

import { assets } from "../../assets/assets";
import { useStores } from "../../contexts/storeContext";
import axios from "axios";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { url } = useStores();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url + "/api/email/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      setResponseMessage("An error occurred while sending your message.");
    }
  };

  return (
    <div className="contact-container" id="contact">
      <div className="contact-image-container">
        <img src="contacts.png" />
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
              name="email"
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
