/* eslint-disable react/prop-types */
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

function ExploreMenu({ catagory, setCatagory }) {
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
                setCatagory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className="explore-menu-list-item"
              key={index}
            >
              <img
                src={item.menu_image}
                alt=""
                className={catagory === item.menu_name ? "Active" : ""}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
