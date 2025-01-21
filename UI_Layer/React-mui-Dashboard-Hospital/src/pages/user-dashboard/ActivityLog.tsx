import React, { useState } from "react";
import { Typography, TextField, Button, Box, Grid } from "@mui/material";

const ActivityLog: React.FC = () => {
  const [activityData, setActivityData] = useState({
    steps: "2000 steps",
    water: "",
    medication: "",
    heartRate: "",
    weight: "",
  });

  const [formValues, setFormValues] = useState({
    water: "",
    medication: "",
    heartRate: "",
    weight: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = () => {
    setActivityData({
      ...activityData,
      water: formValues.water,
      medication: formValues.medication,
      heartRate: formValues.heartRate,
      weight: formValues.weight,
    });
    setFormValues({ water: "", medication: "", heartRate: "", weight: "" }); // Clear form
  };

  return (
    <Box p={4}>
      <Typography variant="h6" gutterBottom>
        Activity Log
      </Typography>

      <Box mb={3}>
        <Typography variant="body1">Today’s Summary:</Typography>
        <Typography variant="body2">Steps: {activityData.steps}</Typography>
        {activityData.water && (
          <Typography variant="body2">Water: {activityData.water} L</Typography>
        )}
        {activityData.medication && (
          <Typography variant="body2">
            Medication: {activityData.medication}
          </Typography>
        )}
        {activityData.heartRate && (
          <Typography variant="body2">
            Heart Rate: {activityData.heartRate} bpm
          </Typography>
        )}
        {activityData.weight && (
          <Typography variant="body2">
            Weight: {activityData.weight} kg
          </Typography>
        )}
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Enter Your Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Daily Water Consumption (L)"
              name="water"
              value={formValues.water}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Have You Followed Medication?"
              name="medication"
              value={formValues.medication}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Heart Rate (bpm)"
              name="heartRate"
              value={formValues.heartRate}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Weight (kg)"
              name="weight"
              value={formValues.weight}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ActivityLog;
