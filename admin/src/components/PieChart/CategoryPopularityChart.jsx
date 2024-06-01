import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import { useStores } from "../../contexts/storeContext";

const CategoryPopularityChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const { url } = useStores();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6347"];
  console.log(categoryData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/order/popularCategory`);
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <PieChart width={350} height={230}>
      <Pie
        data={categoryData}
        cx={130}
        cy={95}
        innerRadius={60}
        outerRadius={100}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {categoryData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default CategoryPopularityChart;
