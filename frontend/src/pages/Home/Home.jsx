import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import Header from "../../components/Header/Header";

import "./Home.css";
import { useState } from "react";

function Home() {
  const [catagory, setCatagory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu catagory={catagory} setCatagory={setCatagory} />
      <FoodDisplay catagory={catagory} />
    </div>
  );
}

export default Home;
