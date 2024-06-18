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
import moment from "moment"; // Import moment.js to format dates

const WeeklyRevenue = () => {
  const [data, setData] = useState([]);
  const { url } = useStores();
  console.log(url);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${url}/api/order/dailyRevenue`); // Update the endpoint to /dailyRevenue
      const formattedData = response.data.map((item) => ({
        day: moment().dayOfYear(item.day).format("YYYY-MM-DD"), // Convert day of the year to date
        revenue: item.revenue,
      }));
      setData(formattedData);
    };
    fetchData();
  }, [url]); // Add url as a dependency to useEffect

  console.log(data);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgb(163 230 53)" />
        <XAxis dataKey="day" stroke="rgb(30 64 175)" />
        <YAxis stroke="rgb(30 64 175)" />
        <Tooltip labelFormatter={(value) => `Date: ${value}`} />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="rgb(22 163 74)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeeklyRevenue;
