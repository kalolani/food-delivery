import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStores } from "../../contexts/storeContext";

function RatingChart() {
  const [data, setData] = useState([]);
  const { url } = useStores();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/api/food/top-rated`);
        const sortedData = response.data.sort((a, b) => b.rating - a.rating);
        const top5Data = sortedData.slice(0, 5);
        setData(top5Data);
      } catch (error) {
        console.error("Error fetching the data", error);
      }
    };

    fetchData();
  }, []);
  return (
    <BarChart
      width={300}
      height={200}
      data={data}
      margin={{
        top: 5,
        right: 5,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="rating" fill="#8884d8" />
    </BarChart>
  );
}

export default RatingChart;
