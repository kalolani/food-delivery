/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Users.css";
import axios from "axios";
import { toast } from "react-toastify";
import FadeLoader from "react-spinners/FadeLoader";
function Users({ url }) {
  const [list, setList] = useState([]);
  const [isListLoading, setListIsLoading] = useState(false);
  // const [isRemoveLoading, setIsRemoveLoading] = useState(false);

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
        <FadeLoader color="#FF6347" loading={isListLoading} size={50} />
      </div>
    );
  return (
    <div className="list add flex-col">
      <p>All categories list</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p onClick={() => removeCategory(item._id)} className="cursor">
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Users;
