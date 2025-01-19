import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", burned: 400, consumed: 500 },
  { day: "Tue", burned: 450, consumed: 600 },
  { day: "Wed", burned: 300, consumed: 550 },
  { day: "Thu", burned: 500, consumed: 700 },
  { day: "Fri", burned: 600, consumed: 800 },
  { day: "Sat", burned: 700, consumed: 750 },
  { day: "Sun", burned: 650, consumed: 600 },
];

const CaloriesChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="burned" fill="#8884d8" />
        <Bar dataKey="consumed" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CaloriesChart;
