import { useEffect, useState } from "react";
import { useStores } from "../../contexts/storeContext";

import axios from "axios";

import ClipLoader from "react-spinners/ClipLoader";
import { NavLink } from "react-router-dom";
import RatingComponent from "../../components/Rating/Rating";
import "./RatingPage.css";
function RatingPage() {
  const { url, token } = useStores();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        url + "/api/order/userorder",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the correct token format
          },
        }
      );
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {isLoading && (
        <div className="loadingComponent">
          <ClipLoader color="#FF6347" loading={isLoading} size={50} />
        </div>
      )}
      <div className="container">
        {data.map((item, index) => {
          return (
            <div key={index} className="my-orders-order">
              {item.items.map((item, index) => {
                return (
                  <>
                    <img
                      src={`${url}/images/` + item.image}
                      alt="item-photo"
                      key={index}
                    />
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <RatingComponent foodId={item._id} />
                  </>
                );
              })}
            </div>
          );
        })}
      </div>
      {/* <NavLink to="/rating">
        <p>Rate your order</p>
      </NavLink> */}
    </div>
  );
}

export default RatingPage;
