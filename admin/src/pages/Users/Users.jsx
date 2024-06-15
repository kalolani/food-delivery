/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Users.css";
import axios from "axios";
import { toast } from "react-toastify";
import FadeLoader from "react-spinners/FadeLoader";
import { useStores } from "../../contexts/storeContext";
function Users({ url }) {
  const [list, setList] = useState([]);
  const [isListLoading, setListIsLoading] = useState(false);
  // const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const { token } = useStores();

  const fetchList = async () => {
    try {
      setListIsLoading(true);
      const response = await axios.get(`${url}/api/user/list`);
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

  //   const removeUser = async (categoryId) => {
  //     try {
  //       // setIsRemoveLoading(true);
  //       const response = await axios.post(`${url}/api/category/remove`, {
  //         id: categoryId,
  //       });
  //       await fetchList();
  //       if (response.data.success) {
  //         toast.success(response.data.message);
  //       } else {
  //         toast.error("Error");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  useEffect(() => {
    fetchList();
  }, []);

  if (!token) return;

  if (isListLoading)
    return (
      <div className="loadingComponent">
        <FadeLoader color="#FF6347" loading={isListLoading} size={50} />
      </div>
    );
  return (
    <div className="list add user-flex-col">
      <p>All Users List</p>
      <div className="list-table">
        <div className="list-table-format-user title">
          <b>Image</b>
          <b>Name</b>
          <p>Emails</p>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-format-user" key={index}>
              {item.image ? (
                <img src={`${url}/images/` + item.image} alt="" />
              ) : (
                "User doesn't upload a photo"
              )}
              <p>{item.name}</p>
              <p>{item.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Users;
