/* eslint-disable react/prop-types */
import "./Edit.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStores } from "../../contexts/storeContext";

function Edit() {
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { token, url } = useStores();

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
  }, [id, url]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCategoryChange = (event) => {
    setData({ ...data, category: event.target.value });
  };

  const handleUpdateButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.put(
      `${url}/api/food/update/${currentItem._id}`,
      formData
    );

    if (response.data.success) {
      toast.success("Updated Successfully");
      navigate("/list");
    } else {
      toast.error("Error Occurred");
    }
  };

  if (!token) return null;

  return (
    <div className="edit-container">
      <form className="flex-col-col" onSubmit={handleUpdateButtonClick}>
        <div className="edit-product-names">
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

        <div className="edit-edit-category flex-col">
          <div className="edit-category-container">
            <p>CATEGORY</p>
            <select
              value={data.category}
              onChange={handleCategoryChange}
              name="category"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="edit-price flex-col">
          <div className="edit-product-container">
            <p>PRICE</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="ETB 20"
            />
          </div>
        </div>

        <div className="edit-product-descriptions flex-col">
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
          />
          <img
            src={
              image ? URL.createObjectURL(image) : `${url}/images/${data.image}`
            }
            alt=""
            className="edit-image"
          />
        </div>

        <button type="submit" className="edit-button">
          EDIT
        </button>
      </form>
    </div>
  );
}

export default Edit;
