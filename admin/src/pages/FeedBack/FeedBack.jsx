import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FadeLoader from "react-spinners/FadeLoader";
import "./FeedBack.css";
import { useStores } from "../../contexts/storeContext";

function FeedBack({ url }) {
  const [feedback, setFeedback] = useState([]);
  const [isListLoading, setIsLoading] = useState(false);
  const { message, setMessage } = useStores();

  useEffect(() => {
    fetchEmails();
  }, []);
  const fetchEmails = async () => {
    try {
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
        <FadeLoader color="#FF6347" loading={isListLoading} size={50} />
      </div>
    );

  return (
    <div className="list add flex-col">
      <p>All foods list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Name</b>
          <b>Email</b>
          <b>Message</b>
        </div>
        {feedback.map((item, index) => {
          console.log(item);
          return (
            <>
              <div className="list-table-format" key={index}>
                <Link to="/messages">
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                  <p>{item.message}</p>
                </Link>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default FeedBack;
