import React from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

// Helper function to get current date
const getCurrentDate = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const ActivityCard = ({ activityName, currentStat, goal, percentage }) => (
  <div style={cardStyle}>
    <div style={headerStyle}>
      <h3 style={{ color: 'black' }}>{activityName}</h3>
      <span style={{ color: 'black' }}>{getCurrentDate()}</span>
    </div>
    <div style={bodyStyle}>
      <p style={{ color: 'black' }}>{currentStat} / {goal}</p>
      <div style={percentageStyle}>{percentage}%</div>
    </div>
    <div style={footerStyle}>
      <FaMicrophone size={20} color="black" />
    </div>
  </div>
);

const MainContent = () => (
  <div style={mainContentStyle}>
    <div style={cardContainerStyle}>
      {/* Activity Cards */}
      <ActivityCard activityName="Water Intake" currentStat="500ml" goal="2L" percentage={25} />
      <ActivityCard activityName="Exercise" currentStat="30 min" goal="60 min" percentage={50} />
      <ActivityCard activityName="Medication" currentStat="1 pill" goal="1 pill" percentage={100} />
      <ActivityCard activityName="Food Intake" currentStat="500 kcal" goal="2000 kcal" percentage={25} />
    </div>

    {/* Summary Charts */}
    <div style={chartsContainerStyle}>
      {/* Pie Chart */}
      <div style={chartStyle}>
        <h4>Activity Completion Summary</h4>
        <PieChart width={250} height={250}>
          <Pie
            data={[
              { name: 'Completed', value: 70 },
              { name: 'Remaining', value: 30 }
            ]}
            cx={125}
            cy={125}
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            paddingAngle={5}
            dataKey="value"
          >
            <Cell fill="#4caf50" />
            <Cell fill="#d32f2f" />
          </Pie>
          <Legend verticalAlign="top" height={36} />
          <Tooltip />
        </PieChart>
        <p style={{ color: 'black' }}>This chart shows the overall completion of your activities.</p>
      </div>

      {/* Bar Chart */}
      <div style={chartStyle}>
        <h4>Activity Breakdown by Category</h4>
        <BarChart width={350} height={250} data={[{ name: 'Water', uv: 500 }, { name: 'Exercise', uv: 30 }, { name: 'Food', uv: 2000 }]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" fill="#4caf50" />
        </BarChart>
        <p style={{ color: 'black' }}>This bar chart gives a breakdown of different activity categories.</p>
      </div>
    </div>
  </div>
);

const mainContentStyle = {
  padding: '20px',
  paddingTop: '0px',
  marginTop: '-60px',
  position: 'absolute',
  marginLeft: '18.8%',
  width: '78.5%'
};

const cardContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)', // Two columns
  gap: '20px',
};

const chartsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)', // Two charts, 50% each
  gap: '20px',
  marginTop: '20px',
};

const cardStyle = {
  backgroundColor: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  padding: '20px',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
  alignItems: 'center',
  gap: '10px'
};

const bodyStyle = {
  marginBottom: '10px',
};

const percentageStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#4caf50',
};

const footerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '20px',
  cursor: 'pointer'
};

const chartStyle = {
  backgroundColor: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
};

export default MainContent;
