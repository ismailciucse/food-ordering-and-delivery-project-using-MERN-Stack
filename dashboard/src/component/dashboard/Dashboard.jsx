import React from "react";
import Title from "../common/title/Title";
import CartItems from "./CartItems";
import "./dashboard.css";
// import OrderChart from "./OrderChart";
// import RevenueChart from "./RevenueChart";

const Dashboard = () => {
  return (
    <>
      <section className="dashboard content">
        <Title title="Dashboard" />
        <div className="dashboard-wrapper">
          <CartItems />
        </div>
        {/* <div className="statics">
          <div className="stats">
            <h3 className="stats-title">Order Statistics</h3>
            <OrderChart />
          </div>
          <div className="stats">
            <h3 className="stats-title">Revenue Statistics</h3>
            <RevenueChart />
          </div>
        </div> */}
      </section>
    </>
  );
};

export default Dashboard;
