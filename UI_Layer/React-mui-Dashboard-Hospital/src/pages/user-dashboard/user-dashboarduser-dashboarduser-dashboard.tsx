// import * as React from "react";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Appbar from "../../components/Appbar"; // Assuming Appbar is a reusable component

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
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PieChart from "../user-dashboard/PieChart";
import BarChart from "../user-dashboard/BarChart";
import HealthCard from "../user-dashboard/HealthCard";
import LatestAppointments from "../user-dashboard/LatestAppointments";
import ActivityLog from "../user-dashboard/ActivityLog";
import Appbar from "../../components/Appbar";

import PeopleIcon from "@mui/icons-material/People";
import TodayIcon from "@mui/icons-material/Today";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

interface CardData {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const cardData: CardData[] = [
  {
    icon: <PeopleIcon />,
    title: "Health Insights",
    value: "Personalized insights based on your activity",
  },
  {
    icon: <TodayIcon />,
    title: "Appointments",
    value: 1,
  },
  {
    icon: <VolunteerActivismIcon />,
    title: "Wellness Alerts",
    value: "Stay informed on common regional conditions",
  },
  // {
  //   icon: <CurrencyRupeeIcon />,
  //   title: "Income",
  //   value: "₹40000",
  // },
];

const chartData = [{ chartName: <PieChart /> }, { chartName: <BarChart /> }];

const UserDashboard: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Health & Wellness Dashboard" />

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
            {cardData.map((item, index) => (
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
            ))}

            {chartData.map((item, index) => (
              <Grid key={index} item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 400,
                  }}
                >
                  {item.chartName}
                </Paper>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <LatestAppointments />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <ActivityLog />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default UserDashboard;
