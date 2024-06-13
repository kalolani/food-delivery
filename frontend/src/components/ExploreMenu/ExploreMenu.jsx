/* eslint-disable react/prop-types */
import "./ExploreMenu.css";
// import { menu_list } from "../../assets/assets";
import { useStores } from "../../contexts/storeContext";

function ExploreMenu() {
  const { menu_list, url, catagory, setCatagory } = useStores();
  return (
    <div className="explore-menu" id="menu">
      <h1>Explore our menu</h1>

      <p className="explore-menu-text">
        Enjoy the convenience of ordering from the comfort of your home and let
        us handle the rest. With easy online ordering and prompt delivery, we
        are here to make your mealtime memorable.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCatagory((prev) => (prev === item.name ? "All" : item.name))
              }
              className="explore-menu-list-item"
              key={index}
            >
              {/*  <img src={`${url}/images/` + item.image} alt="" /> */}
              <img
                src={`${url}/images/` + item.image}
                alt=""
                className={catagory === item.name ? "Active" : ""}
              />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>

      <hr />
    </div>
  );
}

export default ExploreMenu;
