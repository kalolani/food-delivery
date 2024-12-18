/* eslint-disable react/prop-types */
import "./EditProfile.css";
// import { useState } from "react";
import axios from "axios";
import { useStores } from "../../contexts/storeContext";
import FadeLoader from "react-spinners/FadeLoader";
import { useCallback, useEffect, useState } from "react";

function EditProfile() {
  const { url, image, setImage, token } = useStores();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState();
  console.log(image);

  const fetchList = useCallback(async () => {
    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      setIsLoading(true);
      console.log("Token being sent:", token);
      console.log("URL being called:", `${url}/api/image/list-admin`);

      const response = await axios.post(
        `${url}/api/image/list-admin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the correct token format
          },
        }
      );

      console.log("Response data:", response.data);
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        console.log("Error: Data fetch was not successful");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response from server:", error.response.data);
      } else {
        console.error("Error making request:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, url]);

  const getToken = () => {
    return localStorage.getItem("token"); // Ensure this matches where you store the token
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    const token = getToken(); // Retrieve the token
    console.log(token);
    // navigate("/");
    window.location.reload();

    // if (!token) {
    //   console.error("No token found, please log in again");
    //   return;
    // }

    try {
      console.log("Submitting with token:", token); // Debugging: Log token to ensure it's correct
      const response = await axios.post(
        `${url}/api/image/add-admin`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure the correct token format
          },
        }
      );

      if (response.data.success) {
        console.log("Response Message:", response.data.message);
      } else {
        console.log("Response Message:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error uploading image:",
        error.response ? error.response.data : error.message
      );
    }
  };
  useEffect(() => {
    fetchList();
  }, [image, fetchList]);

  if (!token) return;
  if (isLoading)
    return (
      <div className="loadingComponent">
        <FadeLoader color="rgb(212 212 212)" loading={isLoading} size={50} />
      </div>
    );

  return (
    <div className="adds">
      <form className="flex-cols" onSubmit={handleSubmit}>
        <div className="add-img-uploads flex-cols">
          <p>upload image</p>
          <label htmlFor="image" className="labels">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="edit-cameras"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>

            {/* <img
              src={image ? URL.createObjectURL(image) : "camera.png"}
              className="label-img"
              alt=""
            /> */}
            {user?.image ? (
              <img
                src={`${url}/images/${user.image}`}
                className="label-img"
                alt="user-photo"
              />
            ) : (
              <img src="camera.png" className="label-img" alt="user-photo" />
            )}

            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </label>
        </div>

        <button type="submit" className="add-buttons">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="edits"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          Edit
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
