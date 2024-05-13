import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import Header from "../../components/Header/Header";
import "./Home.css";
import { useState } from "react";

function Home() {
  const [catagory, setCatagory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu catagory={catagory} setCatagory={setCatagory} />
    </div>
  );
}

export default Home;
