import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import trackingData from "../../assets/data/trackingData";

const RevenueChart = () => {
  return (
    <>
      <ResponsiveContainer width="100%">
        <LineChart>
          <CartesianGrid strokeDasharray="0" stroke="#b7ffe913" />
          <XAxis dataKey="name" stroke="#ddd" />
          <Line
            type="monotone"
            dataKey="items"
            data={trackingData}
            stroke="#44bd32"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Tooltip wrapperClassName="tooltip-style" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default RevenueChart;
