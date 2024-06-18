/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./CatList.css";
import axios from "axios";
import { toast } from "react-toastify";
import FadeLoader from "react-spinners/FadeLoader";
import { useStores } from "../../contexts/storeContext";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function CatList({ url }) {
  const [list, setList] = useState([]);
  const [isListLoading, setListIsLoading] = useState(false);
  // const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const { token } = useStores();

  // const { token } = useStores();
  // if (!token) return;

  const fetchList = async () => {
    try {
      setListIsLoading(true);
      const response = await axios.get(`${url}/api/category/list`);
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

  const removeCategory = async (categoryId) => {
    try {
      // setIsRemoveLoading(true);
      const response = await axios.post(`${url}/api/category/remove`, {
        id: categoryId,
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
        <FadeLoader
          color="rgb(212 212 212)"
          loading={isListLoading}
          size={50}
        />
      </div>
    );
  if (!token) return;
  return (
    <div className="list add category-list-flex-col">
      <p>All categories list</p>
      <div className="list-table">
        <div className="list-table-formated title">
          <b>Image</b>
          <b>Name</b>
          <b>Edit</b>
          <b>Delete</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-formated" key={index}>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <NavLink to={`/edit-menu?id=${item._id}`}>
                <p className="menu-edit">
                  <FaRegEdit color="rgb(22 163 74)" size={20} />
                </p>
              </NavLink>
              <p
                onClick={() => removeCategory(item._id)}
                className="cursor menu-delete"
              >
                <AiOutlineDelete color="rgb(220 38 38)" size={20} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CatList;
