import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", steps: 5000 },
  { day: "Tue", steps: 7000 },
  { day: "Wed", steps: 8000 },
  { day: "Thu", steps: 6500 },
  { day: "Fri", steps: 9000 },
  { day: "Sat", steps: 10000 },
  { day: "Sun", steps: 7500 },
];

const StepsChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="steps" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StepsChart;
