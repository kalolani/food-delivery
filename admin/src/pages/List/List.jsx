/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import FadeLoader from "react-spinners/FadeLoader";
import "./FoodList.css";
function List({ url }) {
  const [list, setList] = useState([]);
  const [isListLoading, setListIsLoading] = useState(false);
  // const [isRemoveLoading, setIsRemoveLoading] = useState(false);

  const fetchList = async () => {
    try {
      setListIsLoading(true);
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setListIsLoading(false);
    }
  };

  const removeFood = async (foodId) => {
    try {
      // setIsRemoveLoading(true);
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodId,
      });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

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
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price} ETB</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
