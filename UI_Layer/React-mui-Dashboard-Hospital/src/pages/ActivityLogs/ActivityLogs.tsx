import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import OrganData from "./OrganData";
import HealthCard from "./HealthCard";
import LatestAppointments from "./LatestAppointments";
import Appbar from "../../components/Appbar";

import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
const cardData = [
  {
    icon: <LocalDrinkIcon />,
    title: "Water Intake",
    value: 500,
    unit: "ml / 2L",
  },
  {
    icon: <DirectionsRunIcon />,
    title: "Exercise",
    value: 30,
    unit: " min / 60 min",
  },
  {
    icon: <MedicationLiquidIcon />,
    title: "Medication",
    value: 1,
    unit: " pil / 1 pi",
  },
  {
    icon: <LunchDiningIcon />,
    title: "Food Intake",
    value: "500",
    unit: " kal / 2000 kal",
  },
];

const chartData = [
  { chartName: <PieChart /> },
  { chartName: <BarChart /> },
  //{ chartName: <OrganData /> }
];

export default function ActivityLogs() {
  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Activity Logs" />

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
                    unit={item.unit}
                  />
                </Paper>
              </Grid>
            ))}

            {/* Chart */}
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
            {/* <img src="https://echarts.apache.org/examples/data/asset/geo/Veins_Medical_Diagram_clip_art.svg" />
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <LatestAppointments />
              </Paper>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
