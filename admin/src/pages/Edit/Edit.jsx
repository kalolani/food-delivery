/* eslint-disable react/prop-types */
import "./Edit.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useStores } from "../../contexts/storeContext";
import Category from "../Category/Category";
import { useNavigate, useSearchParams } from "react-router-dom";

function Edit() {
  const [image, setImage] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log(id);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const { token, url } = useStores();

  // Inside your Add component
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${url}/api/category/list-category`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, [url]);

  useEffect(() => {
    const fetchItemData = async () => {
      const response = await axios.get(`${url}/api/food/edit/${id}`);
      console.log(response);
      setCurrentItem(response.data);
      setData({
        name: response.data.name,
        description: response.data.description,
        price: response.data.price,
        category: response.data.category,
        image: response.data.image,
      });
    };
    fetchItemData();
  }, [data]);

  console.log(data.category);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", data.name);
  //   formData.append("description", data.description);
  //   formData.append("price", Number(data.price));
  //   formData.append("category", selectedCategory);
  //   formData.append("image", image);
  //   const response = await axios.post(`${url}/api/food/add`, formData);

  //   if (response.data.success) {
  //     setData({
  //       name: "",
  //       description: "",
  //       price: "",
  //       category: "Salad",
  //     });
  //     console.log(data);
  //     setSelectedCategory("Salad");

  //     setImage(false);
  //     toast.success(response.data.message);
  //   } else {
  //     toast.error(response.data.message);
  //   }
  // };
  const handleUpdateButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", selectedCategory);
    formData.append("image", image);
    const response = await axios.put(
      `${url}/api/food/update/${currentItem._id}`,
      formData
    );
    if (response.data.success) {
      // setSelectedCategory("Salad");

      // setImage(image);
      toast.success("Updated Succesfully");
      navigate("/list");
    } else {
      toast.error("Error Occurred");
    }
  };
  if (!token) return;
  return (
    <div className="add-add">
      <form className="flex-col-col" onSubmit={handleUpdateButtonClick}>
        <div className="add-img-uploaded flex-col"></div>
        <div className="add-product-names flex-col">
          <div className="flex-container">
            <p>NAME</p>

            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Type here"
              name="name"
            />
          </div>
        </div>

        <div className="add-category flex-col">
          <div className="category-container">
            <p>CATEGORY</p>
            <select
              value={selectedCategory}
              onChange={handleChange}
              name="category"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories?.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="add-price flex-col">
          <div className="product-container">
            <p>PRICE</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="ETB 20"
            />
          </div>
        </div>
        <div className="add-product-descriptions flex-col">
          <div className="description-container">
            <p>DESCRIPTION</p>

            <textarea
              onChange={onChangeHandler}
              value={data.description}
              type="text"
              placeholder="Write content here"
              rows={6}
              name="description"
            />
          </div>
        </div>
        <div className="upload-container">
          <p>UPLOAD IMAGE</p>
          <label htmlFor="file">
            <p>upload file</p>
          </label>

          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="file"
            required
          />
          <img
            // src={`${url}/images/` + data.image}
            src={
              image ? URL.createObjectURL(image) : `${url}/images/` + data.image
            }
            alt=""
            className="edit-image"
          />
        </div>

        <button type="submit" className="add-buttonss">
          EDIT
        </button>
      </form>
    </div>
  );
}

export default Edit;
