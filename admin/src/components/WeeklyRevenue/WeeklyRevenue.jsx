import "./WeeklyRevenue.css";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useStores } from "../../contexts/storeContext";

const WeeklyRevenue = () => {
  const [data, setData] = useState([]);
  const { url } = useStores();
  console.log(url);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}/api/order/weeklyRevenue`);
      setData(response.data);
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip labelFormatter={(value) => `Week ${value}`} />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="rgb(22 163 74)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeeklyRevenue;
