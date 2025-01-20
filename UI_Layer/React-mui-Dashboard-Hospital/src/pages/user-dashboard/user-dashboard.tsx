// import * as React from "react";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Appbar from "../../components/Appbar"; // Assuming Appbar is a reusable component

import {
  CircularProgress,
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import Appbar from "../../components/Appbar";
import HealthCard from "./HealthCard";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";

// import HealthCard from "./HealthCard";
// import HealthAlert from "./HealthAlert";
// import ActivityLog from "./ActivityLog";
// import PersonalizedInsights from "./PersonalizedInsights";
// import Recommendations from "./Recommendations";

// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
// import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

// const cardData = [
//   {
//     icon: <AccountCircleIcon />,
//     title: "User Info",
//     value: "John Doe, 28 years old",
//   },
//   {
//     icon: <NotificationsIcon />,
//     title: "Health Alerts",
//     value: "No Alerts",
//   },
//   {
//     icon: <FitnessCenterIcon />,
//     title: "Activity Log",
//     value: "2000 steps today",
//   },
//   {
//     icon: <HealthAndSafetyIcon />,
//     title: "Recent Recommendations",
//     value: "Increase water intake",
//   },
// ];

// const healthAlerts = [
//   {
//     condition: "Malaria",
//     alert:
//       "Consider taking anti-malarial medication if you're in an affected area.",
//   },
//   {
//     condition: "High Blood Pressure",
//     alert:
//       "Monitor your blood pressure and visit a doctor if you experience symptoms.",
//   },
// ];

// export default function HealthDashboard() {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <Appbar appBarTitle="Health Insights Dashboard" />

//       <Box
//         component="main"
//         sx={{
//           backgroundColor: (theme) =>
//             theme.palette.mode === "light"
//               ? theme.palette.grey[100]
//               : theme.palette.grey[900],
//           flexGrow: 1,
//           height: "100vh",
//           overflow: "auto",
//         }}
//       >
//         <Toolbar />

//         <Container sx={{ mt: 4, mb: 4 }}>
//           <Grid container spacing={3}>
//             {/* Health Cards */}
//             {cardData.map((item, index) => (
//               <Grid key={index} item xs={12} md={4} lg={3}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: "flex",
//                     flexDirection: "column",
//                     height: 200,
//                   }}
//                 >
//                   <HealthCard
//                     icon={item.icon}
//                     title={item.title}
//                     value={item.value}
//                   />
//                 </Paper>
//               </Grid>
//             ))}

//             {/* Health Alerts */}
//             <Grid item xs={12} md={6} lg={6}>
//               <Paper
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   height: 400,
//                 }}
//               >
//                 <HealthAlert alerts={healthAlerts} />
//               </Paper>
//             </Grid>

//             {/* Personalized Insights */}
//             <Grid item xs={12} md={6} lg={6}>
//               <Paper
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   height: 400,
//                 }}
//               >
//                 <PersonalizedInsights />
//               </Paper>
//             </Grid>

//             {/* Activity Log */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
//                 <ActivityLog />
//               </Paper>
//             </Grid>

//             {/* Recommendations */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
//                 <Recommendations />
//               </Paper>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </Box>
//   );
// }

// src/pages/Dashboard.tsx

interface CardData {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

interface DashboardData {
  cardData: CardData[];
  chartData: { ChartComponent: React.ReactNode }[];
}

const UserDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Retrieve token from sessionStorage or localStorage
  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      const domain_name = "http://localhost:8000"; // Update with your backend URL

      try {
        const response = await axios.get(
          `${domain_name}/api/health/dashboard/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setDashboardData(response.data);
        } else {
          setError("Failed to fetch data.");
        }
      } catch (error) {
        setError("Error fetching dashboard data.");
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Health Dashboard" />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />

        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Cards */}
            {dashboardData?.cardData?.length ? (
              dashboardData.cardData.map((item, index) => (
                <Grid key={index} item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 200,
                    }}
                  >
                    <HealthCard
                      icon={item.icon}
                      title={item.title}
                      value={item.value}
                    />
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <div>No health data available for cards.</div>
                </Paper>
              </Grid>
            )}

            {/* Charts */}
            {/* Charts */}
            {dashboardData?.chartData?.length ? (
              dashboardData.chartData.map((chartItem, index) => (
                <Grid key={index} item xs={12} md={6} lg={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 400,
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[chartItem]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip title="Tooltip">
                          <span></span>
                        </Tooltip>
                        <Legend />
                        <Bar dataKey="steps" fill="#8884d8" />
                        <Bar dataKey="calories" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <div>No health data available for charts.</div>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default UserDashboard;
