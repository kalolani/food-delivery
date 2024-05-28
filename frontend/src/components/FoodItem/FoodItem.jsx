/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./FoodItem.css";
import { assets } from "../../assets/assets";

import { useStores } from "../../contexts/storeContext";
import ClipLoader from "react-spinners/ClipLoader";
import StarRating from "../UserRating/StarRating";
import { useState } from "react";

function FoodItem({ id, name, price, description, image }) {
  const [userRating, setUserRating] = useState("");
  const { isRated } = useStores();

  const {
    cartItem,
    addItem,
    removeItem,
    url,
    cartAddLoading,
    cartRemLoading,
    getCartNumber,
    cartNumber,
  } = useStores();
  const combinedLoading = cartAddLoading || cartRemLoading;

  const handleAddItem = (id) => {
    addItem(id);
  };

  const handleRemoveItem = () => {};
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={url + "/images/" + image}
          alt=""
          className="food-item-image"
        />

        {!cartItem[id] ? (
          <img
            onClick={() => handleAddItem(id)}
            src={assets.add_icon_white}
            className="add"
            alt=""
          />
        ) : (
          <>
            <div className="food-item-counter">
              {combinedLoading ? (
                <ClipLoader
                  color="#FF6347"
                  loading={combinedLoading}
                  size={25}
                  id={id}
                />
              ) : (
                <>
                  <img
                    onClick={() => removeItem(id)}
                    src={assets.remove_icon_red}
                    alt=""
                  />
                  <p>{cartItem[id]}</p>
                  <img
                    onClick={() => addItem(id)}
                    src={assets.add_icon_green}
                    alt=""
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          {isRated ? (
            <p>Rated ⭐</p>
          ) : (
            <StarRating
              maxRating={5}
              size={15}
              userRatingHandler={setUserRating}
            />
          )}
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
