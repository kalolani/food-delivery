/* eslint-disable react/prop-types */
import "./Category.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useStores } from "../../contexts/storeContext";

function Category({ url }) {
  const [image, setImage] = useState(false);
  //   const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState({
    name: "",
  });
  console.log(data.name);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const { token } = useStores();

  //   const handleChange = (event) => {
  //     // setSelectedCategory(event.target.value);
  //   };

  // const { token } = useStores();
  // if (!token) return;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/category/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
      });
      console.log(data);

      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  if (!token) return;
  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </label>
        </div>
        <div className="add-product-name flex-col">
          <p>product name</p>

          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
            name="name"
          />
        </div>

        <button type="submit" className="add-button">
          ADD
        </button>
      </form>
    </div>
  );
}

export default Category;
