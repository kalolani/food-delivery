/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import Rating from "react-rating-stars-component";
import { useStores } from "../../contexts/storeContext";

const ItemRate = ({ foodId }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const { url } = useStores();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const submitRating = () => {
    axios
      .post(`${url}/api/food/rating`, { foodId, rating })
      .then((response) => {
        setMessage("Rating submitted successfully!");
      })
      .catch((error) => {
        console.error("Error submitting rating:", error);
        setMessage("Error submitting rating. Please try again.");
      });
  };

  return (
    <div className="rating-container">
      {/* <h2>Rate Your Order</h2> */}
      <Rating
        count={5}
        value={rating}
        onChange={handleRatingChange}
        size={20}
        activeColor="#fcc419"
      />
    </div>
  );
};

export default ItemRate;
