import CategoryPopularityChart from "../../components/PieChart/CategoryPopularityChart";
import WeeklyRevenue from "../../components/WeeklyRevenue/WeeklyRevenue";
import TotalAmount from "../../components/TotalAmount/TotalAmount";
import "./Dashboard.css";
import { IoGridOutline } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlinePedalBike } from "react-icons/md";
import { MdOutlineHourglassTop } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { PiUsersFourLight } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";
import TotalCategory from "../../components/TotalCategory/TotalCategory";
import TotalOrder from "../../components/TotalOrder/TotalOrder";
import FoodItem from "../../components/FoodItem/FoodItem";
import Delivered from "../../components/Delivered/Delivered";
import Pending from "../../components/Pending/Pending";
import User from "../../components/User/User";
import RecentOrders from "../../components/Recent/RecentOrders";
import RatingChart from "../../components/RatingChart/RatingChart";
import Email from "../../components/Email/Email";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-statics-container">
        <div className="dashboard-statics sold-amount">
          <div className="dashboard-statics-icon">
            <span>
              <GiMoneyStack size={35} color="rgb(22 101 52)" />
            </span>
          </div>
          <div className="dashboard-statics-content">
            <p className="name">Sold Amount</p>
            <p className="number">
              <TotalAmount />
            </p>
          </div>
        </div>
        <div className="dashboard-statics categories">
          <div className="dashboard-statics-icon">
            <span>
              <IoGridOutline size={35} color=" rgb(132 204 22)" />
            </span>
          </div>
          <div className="dashboard-statics-content">
            <p className="name">Categories</p>
            <TotalCategory />
          </div>
        </div>
        <div className="dashboard-statics orders">
          <div className="dashboard-statics-icon">
            <span>
              <MdOutlineAddShoppingCart size={35} color="rgb(245 158 11)" />
            </span>
          </div>
          <div className="dashboard-statics-content">
            <p className="name">Total Orders</p>
            <TotalOrder />
          </div>
        </div>
        <div className="dashboard-statics products">
          <div className="dashboard-statics-icon">
            <span>
              <IoFastFoodOutline size={35} color="rgb(99 102 241)" />
            </span>
          </div>
          <div className="dashboard-statics-content">
            <p className="name">Products</p>
            <FoodItem />
          </div>
        </div>
        <div className="dashboard-statics delivered">
          <div className="dashboard-statics-icon">
            <span>
              <MdOutlinePedalBike size={35} color="rgb(22 163 74)" />
            </span>
          </div>
          <div className="dashboard-statics-content">
            <p className="name">Delivred Items</p>
            <Delivered />
          </div>
        </div>
        <div className="dashboard-statics pending">
          <div className="dashboard-statics-icon">
            <span>
              <MdOutlineHourglassTop size={35} color="rgb(13 148 136)" />
            </span>
          </div>
          <div className="dashboard-statics-content">
            <p className="name">Pending Items</p>
            <Pending />
          </div>
        </div>
        <div className="dashboard-statics feedbacks">
          <div className="dashboard-statics-icon">
            <span>
              <AiOutlineMail size={35} color=" rgb(67 20 7)" />
            </span>
          </div>
          <div className="dashboard-statics-content">
            <p className="name">Feedbacks</p>
            <Email />
          </div>
        </div>
        <div className="dashboard-statics users">
          <div className="dashboard-statics-icon">
            <span>
              <PiUsersFourLight size={35} color="rgb(113 63 18)" />
            </span>
          </div>
          <div className="dashboard-statics-content">
            <p className="name">Users</p>
            <User />
          </div>
        </div>
      </div>
      <div className="dashboard-chart-container">
        <div className="line-charts">
          <h3>Weekly Sales Revenue Over Time</h3>
          <WeeklyRevenue />
        </div>

        <div className="line-charts">
          <p>Category Popularity</p>
          <CategoryPopularityChart />
        </div>
      </div>
      <div className="rating-component">
        <div className="line-charts">
          <h3>Top Rated Items By Users</h3>
          <RatingChart />
        </div>
      </div>
      <div className="recent-orders-container">
        <RecentOrders />
      </div>
    </div>
  );
}

export default Dashboard;
