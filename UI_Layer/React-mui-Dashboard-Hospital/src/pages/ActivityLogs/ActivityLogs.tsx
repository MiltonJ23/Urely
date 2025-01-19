import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Appbar from "../../components/Appbar";
import HealthCard from "./HealthCard";

import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import LunchDiningIcon from "@mui/icons-material/LunchDining";

const ActivityLogs = () => {
  interface Log {
    water_intake: number;
    exercise_duration: number;
    medication_count: number;
    food_intake: number;
  }

  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const response = await axios.get(
          "http://localhost:8000/api/health/activity-logs/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Use API response or default to an empty log structure
        setLogs(
          response.data.length > 0
            ? response.data
            : [
                {
                  water_intake: 0,
                  exercise_duration: 0,
                  medication_count: 0,
                  food_intake: 0,
                },
              ]
        );
      } catch (error) {
        console.error("Error fetching activity logs", error);
        setLogs([
          {
            water_intake: 0,
            exercise_duration: 0,
            medication_count: 0,
            food_intake: 0,
          },
        ]); // Default to 0 values if an error occurs
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
          <Grid container spacing={4} direction="column">
            {" "}
            {/* Force vertical stacking */}
            {logs.map((log, index) => (
              <Grid key={index} item xs={12} md={12} lg={12}>
                {" "}
                {/* Full width */}
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    height: "auto",
                    justifyContent: "space-between",
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
                    unit="pill / 1 pill"
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
};

export default ActivityLogs;
