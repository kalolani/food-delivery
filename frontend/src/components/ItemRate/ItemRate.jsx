/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import Rating from "react-rating-stars-component";
import { useStores } from "../../contexts/storeContext";

const ItemRate = ({ id }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { url } = useStores();

  const handleRatingChange = (newRating) => {
    // setAverageRating(newRating);
  };

  let rating = averageRating;
  console.log(rating);

  const getAverageRating = async (id) => {
    try {
      const response = await axios.get(`${url}/api/food/average-rating/${id}`);

      setAverageRating(response.data.averageRating);
    } catch (error) {
      console.error("Error fetching average rating:", error);
      throw error;
    }
  };

  useEffect(() => {
    getAverageRating(id);
  }, [id]);

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
