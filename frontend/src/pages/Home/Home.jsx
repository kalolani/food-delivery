import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import Header from "../../components/Header/Header";

import "./Home.css";

function Home() {
  return (
    <div>
      <Header />
      <ExploreMenu />
      <FoodDisplay />
    </div>
  );
}

export default Home;
