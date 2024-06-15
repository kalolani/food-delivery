import "./SearchBar.css";

// src/SearchBar.js
import { useEffect, useState } from "react";
import axios from "axios";
import { useStores } from "../../contexts/storeContext";
import { Link } from "react-scroll";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const { url, setCatagory } = useStores();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url + "/api/category/list-category");
        console.log(response.data.categories);
        setData(response.data.categories);
        setFilteredData(response.data.category);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = data?.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  return (
    <div className="SearchNavbar">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="search"
      />
      {query.length && filteredData?.length > 0 ? (
        <ul>
          {filteredData?.map((item, index) => (
            <>
              <Link
                to="menu"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                className="navbar-search"
                onClick={() => setCatagory(item.name)}
              >
                <li key={index} onClick={() => setQuery("")}>
                  {item.name}
                </li>
              </Link>
            </>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchBar;
