import WeeklyRevenue from "../../components/WeeklyRevenue/WeeklyRevenue";
import "./Dashboard.css";
import { PiCurrencyCircleDollarThin } from "react-icons/pi";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-statics-container">
        <div className="dashboard-statics">
          <div className="dashboard-statics-icon">
            <span>
              <PiCurrencyCircleDollarThin size={35} color=" rgb(29 78 216)" />
            </span>
          </div>
          <div className="dashboard-statics-content">
            <p className="name">SALES</p>
            <p className="number">100 ETB</p>
          </div>
        </div>
        <div className="dashboard-statics">
          <div className="dashboard-statics-icon">
            <span>
              <PiCurrencyCircleDollarThin size={35} color="rgb(180 83 9)" />
            </span>
          </div>
          <div className="dashboard-statics-content">
            <p className="name">SALES</p>
            <p className="number">100 ETB</p>
          </div>
        </div>
        <div className="dashboard-statics">
          <div className="dashboard-statics-icon">
            <span>
              <PiCurrencyCircleDollarThin size={35} color="rgb(77 124 15)" />
            </span>
          </div>
          <div className="dashboard-statics-content">
            <p className="name">SALES</p>
            <p className="number">100 ETB</p>
          </div>
        </div>
        <div className="dashboard-statics">
          <div className="dashboard-statics-icon">
            <span>
              <PiCurrencyCircleDollarThin size={35} color="rgb(46 16 101)" />
            </span>
          </div>
          <div className="dashboard-statics-content">
            <p className="name">SALES</p>
            <p className="number">100 ETB</p>
          </div>
        </div>
      </div>
      <div className="dashboard-chart-container">
        <div className="line-charts">
          <h3>Weekly Sales Revenue Over Time</h3>
          <WeeklyRevenue />
        </div>
        <div className="line-charts">
          <h3>Weekly Sales Revenue Over Time</h3>
          <WeeklyRevenue />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
