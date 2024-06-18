import "./Category-edit.css";
import { assets } from "../../assets/assets";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useStores } from "../../contexts/storeContext";
import { useNavigate, useSearchParams } from "react-router-dom";

function Category_edit() {
  const [image, setImage] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [data, setData] = useState({
    name: "",
  });
  const [searchParams] = useSearchParams();
  const { url } = useStores();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemData = async () => {
      const response = await axios.get(`${url}/api/category/edit/${id}`);
      console.log(response);
      setCurrentItem(response.data);
      setData({
        name: response.data.name,
        image: response.data.image,
      });
    };
    fetchItemData();
  }, [id, url]);

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

  const handleUpdateButtonClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", image);

    const response = await axios.put(
      `${url}/api/category/update/${currentItem._id}`,
      formData
    );

    if (response.data.success) {
      toast.success("Updated Successfully");
      navigate("/catlist");
    } else {
      toast.error("Error Occurred");
    }
  };
  if (!token) return;
  return (
    <div className="edit-category">
      <form className="flex-col" onSubmit={handleUpdateButtonClick}>
        <div className="edit-category-img-upload flex-col">
          <p>upload image</p>
          <label htmlFor="image">
            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : `${url}/images/${data.image}`
              }
              alt=""
              className="edit-image"
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
        <div className="edit-category-product-name flex-col">
          <p>product name</p>

          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
            name="name"
          />
        </div>

        <button type="submit" className="edit-category-button">
          EDIT
        </button>
      </form>
    </div>
  );
}

export default Category_edit;
