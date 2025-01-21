import React, { useEffect, useState, useCallback } from "react";
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
import FireIcon from "@mui/icons-material/Whatshot"; // Better for Calories
import StepsIcon from "@mui/icons-material/DirectionsWalk"; // Better for Steps
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

const ActivityLogs = () => {
  interface Log {
    calories_burned: number; // FIX: Changed from unknown to number
    steps_covered: number;
    water_intake: number;
    exercise_duration: number;
    medication_count: number;
    food_intake: number;
  }

  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState<Log | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found.");

      const response = await axios.get(`${API_BASE_URL}/api/health/metrics/today/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setLogs(
        response.data && Object.keys(response.data).length > 0
          ? [response.data]
          : [
              {
                water_intake: 0,
                exercise_duration: 0,
                medication_count: 0,
                calories_burned: 0,
                steps_covered: 0,
                food_intake: 0,
              },
            ]
      );
      setError(null);
    } catch (error) {
      setError("Failed to fetch activity logs. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [editMode]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleEditClick = (log: Log) => {
    setEditValues(log);
    setEditMode(true);
  };

  const handleSave = async () => {
    if (editValues) {
      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found.");

        const response = await axios.put(`${API_BASE_URL}/api/health/metrics/today/`, editValues, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLogs([response.data]);
        setEditMode(false);
        setEditValues(null);
        setError(null);
      } catch (error) {
        setError("Error saving activity log. Please try again.");
        console.error(error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Log) => {
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
          backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container sx={{ mt: 4, mb: 4 }}>
          {error && <Box sx={{ color: "red", mb: 2 }}>{error}</Box>}

          <Grid container spacing={4} direction="column">
            {logs.map((log, index) => (
              <Grid key={index} item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                  <HealthCard icon={<LocalDrinkIcon />} title="Water Intake" value={log.water_intake} unit="ml / 2000 ml" />
                  <HealthCard icon={<DirectionsRunIcon />} title="Exercise" value={log.exercise_duration} unit="min / 60 min" />
                  <HealthCard icon={<MedicationLiquidIcon />} title="Medication" value={log.medication_count} unit="pills / day" />
                  <HealthCard icon={<FireIcon />} title="Calories Burned" value={log.calories_burned} unit="kcal / 2000 kcal" />
                  <HealthCard icon={<StepsIcon />} title="Steps Covered" value={log.steps_covered} unit="steps / 10000 steps" />
                  <HealthCard icon={<LunchDiningIcon />} title="Food Intake" value={log.food_intake} unit="kcal / 2000 kcal" />

                  <Button variant="outlined" color="primary" onClick={() => handleEditClick(log)}>
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
                {Object.keys(editValues).map((key) => (
                  <Grid key={key} item xs={12} sm={6}>
                    <TextField
                      label={key.replace("_", " ").toUpperCase()}
                      type="number"
                      value={editValues[key as keyof Log]}
                      onChange={(e) => handleChange(e, key as keyof Log)}
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                ))}
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