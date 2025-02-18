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

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("/api/activity-logs");
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching activity logs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) return <div>Loading...</div>;

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
        <Container sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {logs.map((log, index) => (
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
                    icon={<LocalDrinkIcon />}
                    title="Water Intake"
                    value={log.water_intake}
                    unit="ml / 2L"
                  />
                  <HealthCard
                    icon={<DirectionsRunIcon />}
                    title="Exercise"
                    value={log.exercise_duration}
                    unit="min / 60 min"
                  />
                  <HealthCard
                    icon={<MedicationLiquidIcon />}
                    title="Medication"
                    value={log.medication_count}
                    unit="pil / 1 pi"
                  />
                  <HealthCard
                    icon={<LunchDiningIcon />}
                    title="Food Intake"
                    value={log.food_intake}
                    unit="kcal / 2000 kcal"
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
