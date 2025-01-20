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
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const ActivityLogs = () => {
  interface Log {
    steps_covered: number;
    water_intake: number;
    exercise_duration: number;
    medication_count: number;
    food_intake: number;
  }

  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<Log | null>(null);
  const [error, setError] = useState<string | null>(null); // For error handling

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found.");
        }

        const response = await axios.get(
          "http://localhost:8000/api/health/metrics/today/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

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
        setError("Error fetching activity logs.");
        console.error("Error fetching activity logs", error);
        setLogs([
          {
            water_intake: 0,
            exercise_duration: 0,
            medication_count: 0,
            food_intake: 0,
            steps_covered: 0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleEditClick = (log: Log) => {
    setEditValues(log);
    setEditMode(true);
  };

  const handleSave = async () => {
    if (editValues) {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("No authentication token found.");
        }
        const domain_name = 'http://localhost:8000';

        const response = await axios.put(
          `${domain_name}/api/health/activity-logs/`,
          editValues,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.length === 0) {
          await axios.post(
            `${domain_name}/api/health/activity-logs/`,
            editValues,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        setLogs(response.data);
        setEditMode(false);
        setEditValues(null);
      } catch (error) {
        setError("Error saving activity log.");
        console.error("Error saving activity log", error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    if (editValues) {
      setEditValues({ ...editValues, [field]: Number(e.target.value) });
    }
  };

  if (loading) return <CircularProgress />;

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
          {error && <Box sx={{ color: "red", mb: 2 }}>{error}</Box>}

          <Grid container spacing={4} direction="column">
            {logs.map((log, index) => (
              <Grid key={index} item xs={12} md={12} lg={12}>
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
                    icon={<MedicationLiquidIcon />}
                    title="Calories Burned"
                    value={log.medication_count}
                    unit="kcal / 2000 kcal"
                  />
                  <HealthCard
                    icon={<MedicationLiquidIcon />}
                    title="Steps covered"
                    value={log.medication_count}
                    unit="steps / 10000 steps"
                  />
                  <HealthCard
                    icon={<LunchDiningIcon />}
                    title="Food Intake"
                    value={log.food_intake}
                    unit="kcal / 2000 kcal"
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClick(log)}
                  >
                    Edit
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Edit Form */}
          {editMode && editValues && (
            <Box sx={{ mt: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Water Intake (ml)"
                    type="number"
                    value={editValues.water_intake}
                    onChange={(e) => handleChange(e, "water_intake")}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Exercise Duration (min)"
                    type="number"
                    value={editValues.exercise_duration}
                    onChange={(e) => handleChange(e, "exercise_duration")}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Calories Burned (kcal)"
                    type="number"
                    value={editValues.exercise_duration}
                    onChange={(e) => handleChange(e, "calories_burned")}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Steps Covered"
                    type="number"
                    value={editValues.steps_covered}
                    onChange={(e) => handleChange(e, "steps_covered")}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Medication Count"
                    type="number"
                    value={editValues.medication_count}
                    onChange={(e) => handleChange(e, "medication_count")}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Food Intake (kcal)"
                    type="number"
                    value={editValues.food_intake}
                    onChange={(e) => handleChange(e, "food_intake")}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default ActivityLogs;
