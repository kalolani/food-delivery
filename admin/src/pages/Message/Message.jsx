/* eslint-disable no-unused-vars */
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useStores } from "../../contexts/storeContext";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import "./Message.css";

const Message = ({ url }) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/feedback");
  };

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await axios.get(`${url}/api/email/message/${id}`);
        setMessage(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmail();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="message">
      <div className="back-arrow" onClick={goBack}>
        <HiOutlineArrowNarrowLeft size={40} />
      </div>
      <div className="message-container">
        <p className="message-name">
          <strong>name</strong>: {message.name}
        </p>
        <p className="message-email">
          <strong>Email:</strong> {message.email}
        </p>

        <p className="message-date">
          <strong>Date:</strong>{" "}
          {format(new Date(message.receivedAt), "MMM d, yyyy HH:mm")}
        </p>
        <p className="message-body">{message.message}</p>
      </div>
    </div>
  );
};

export default Message;