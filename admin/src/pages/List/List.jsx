/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import FadeLoader from "react-spinners/FadeLoader";
import "./FoodList.css";
import { useStores } from "../../contexts/storeContext";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";

function List({ url }) {
  const [list, setList] = useState([]);
  const [isListLoading, setListIsLoading] = useState(false);

  const { token } = useStores();

  // const { token } = useStores();
  // if (!token) return;

  // const handleEdit = async (e) => {
  //   e.preventDefault();
  //   navigate("/edit");
  // };

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
  if (!token) return;

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
  return (
    <div className="list add list-flex-col">
      <p>All foods list</p>
      <div className="list-table">
        <div className="list-table-formats titles">
          <b className="image-title">Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Edit</b>
          <b>Delete</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-formats" key={index}>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price} ETB</p>
              <NavLink to={`/edit-list?id=${item._id}`}>
                <p className="edit-item">
                  <FiEdit size={20} color="rgb(22 163 74)" />
                </p>
              </NavLink>
              <p onClick={() => removeFood(item._id)} className="cursor">
                <AiOutlineDelete size={20} color="rgb(220 38 38)" />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
