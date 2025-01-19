import * as React from "react";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

// Define TypeScript interface for the data from the backend
interface PieChartData {
  upcomingAppointments: number;
  patientsHandled: number;
  operationsPerformed: number;
  patientsReferred: number;
}

export default function PieChart() {
  const [chartData, setChartData] = useState<PieChartData | null>(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchChartData = async () => {
      const domain_name = "http://localhost"; // Backend URL
      
      try {
        const response = await fetch(`${domain_name}:8000/api/appointments/statistics/`);
        if (!response.ok) {
          throw new Error("Failed to fetch chart data");
        }

        const data: PieChartData = await response.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  // If data is not yet fetched, show a loading state or a placeholder chart
  if (!chartData) {
    return <div>Loading chart data...</div>;
  }

  // Option for the chart
  const option = {
    legend: {
      top: "bottom"
    },
    tooltip: {
      trigger: "item"
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [50, 100],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
          borderColor: "#fff",
          borderWidth: 2
        },
        data: [
          { value: chartData.upcomingAppointments, name: "Upcoming appointments" },
          { value: chartData.patientsHandled, name: "Patients handled" },
          { value: chartData.operationsPerformed, name: "Operations performed" },
          { value: chartData.patientsReferred, name: "Patients referred" }
        ]
      }
    ]
  };

  return (
    <React.Fragment>
      <ReactECharts option={option} />
    </React.Fragment>
  );
}
