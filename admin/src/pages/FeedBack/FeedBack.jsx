/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import "./FeedBack.css";
import { useStores } from "../../contexts/storeContext";

function FeedBack({ url }) {
  const [feedback, setFeedback] = useState([]);
  const [isListLoading, setIsLoading] = useState(false);
  // const { token } = useStores();
  // if (!token) return;
  const { token } = useStores();

  const maxLength = 50;

  useEffect(() => {
    fetchEmails();
  }, []);
  const fetchEmails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url + "/api/email/fetch-email");

      setFeedback(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isListLoading)
    return (
      <div className="loadingComponent">
        <FadeLoader
          color="rgb(212 212 212)"
          loading={isListLoading}
          size={50}
        />
      </div>
    );
  if (!token) return;
  return (
    <div className="list add feed-back-flex-col">
      <p>All Messages</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Name</b>
          <b>Email</b>
          <b>Message</b>
        </div>
        {feedback.map((item, index) => {
          return (
            <>
              <NavLink to={`/messages?id=${item._id}`}>
                <div className="list-table-format" key={index}>
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                  <p>
                    {item.message
                      ? item.message.length > maxLength
                        ? `${item.message.substring(0, maxLength)}...`
                        : item.message
                      : "No message available"}
                  </p>
                </div>
              </NavLink>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default FeedBack;
