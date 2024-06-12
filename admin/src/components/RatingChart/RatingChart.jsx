import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
  }, [url]);

  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgb(163 230 53)" />
          <XAxis dataKey="name" stroke="rgb(30 64 175)" />
          <YAxis stroke="rgb(30 64 175)" />
          <Tooltip />
          <Legend />
          <Bar dataKey="rating" fill="rgb(29 78 216)" barSize={80} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RatingChart;
