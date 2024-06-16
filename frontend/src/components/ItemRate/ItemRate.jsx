/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { useStores } from "../../contexts/storeContext";
import { styled } from "@mui/system";

const CustomRating = styled(Rating)({
  "& .MuiRating-iconEmpty": {
    color: "rgb(120 113 108)", // Change this to your desired border color
  },
});

const ItemRate = ({ id }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { url } = useStores();

  const handleRatingChange = (newRating) => {
    // setAverageRating(newRating);
  };
  console.log(averageRating);

  const getAverageRating = async (id) => {
    try {
      const response = await axios.get(`${url}/api/food/average-rating/${id}`);
      console.log(response);
      console.log(response.data.averageRating);
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
    <div>
      <CustomRating
        name="simple-controlled"
        value={averageRating}
        precision={0.5}
        readOnly
      />
    </div>
  );
};

export default ItemRate;
