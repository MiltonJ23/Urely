import React, { useState } from "react";
import { Typography, TextField, Button, Box, Grid, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

// Function to return common styles for form fields
const formFieldStyles = {
  fullWidth: true,
  variant: "outlined" as "outlined",
  sx: { mb: 2 }, // Margin at the bottom of each field
};

// Function for styling the typography elements
const typographyStyles = {
  header: {
    variant: "h6" as "h6",
    gutterBottom: true,
  },
  bodyText: {
    variant: "body1" as "body1",
    gutterBottom: true,
  },
};

const ActivityLog: React.FC = () => {
  const [activityData, setActivityData] = useState({
    steps: "2000 steps",
    water: "",
    medication: "",
    heartRate: "",
    weight: "",
  });

  const [formValues, setFormValues] = useState({
    steps: "2000 steps",
    water: "",
    medication: "",
    heartRate: "",
    weight: "",
  });

  const [editMode, setEditMode] = useState({
    steps: false,
    water: false,
    medication: false,
    heartRate: false,
    weight: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleEditToggle = (field: keyof typeof editMode) => {
    setEditMode({ ...editMode, [field]: !editMode[field] });
  };

  const handleSubmit = () => {
    setActivityData({
      ...activityData,
      steps: formValues.steps,
      water: formValues.water,
      medication: formValues.medication,
      heartRate: formValues.heartRate,
      weight: formValues.weight,
    });
    setFormValues({ steps: "", water: "", medication: "", heartRate: "", weight: "" }); // Clear form
  };

  return (
    <Box p={4}>
      <Typography {...typographyStyles.header}>Activity Log</Typography>

      <Box mb={3}>
        <Typography {...typographyStyles.bodyText}>Today’s Summary:</Typography>

        {/* Steps Field */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Steps: {activityData.steps}</Typography>
          <IconButton onClick={() => handleEditToggle("steps")}>
            <EditIcon />
          </IconButton>
        </Box>
        {editMode.steps ? (
          <TextField
            {...formFieldStyles}
            label="Steps Taken"
            name="steps"
            value={formValues.steps}
            onChange={handleInputChange}
            autoFocus
          />
        ) : null}

        {/* Water Field */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Water: {activityData.water || "N/A"}</Typography>
          <IconButton onClick={() => handleEditToggle("water")}>
            <EditIcon />
          </IconButton>
        </Box>
        {editMode.water ? (
          <TextField
            {...formFieldStyles}
            label="Daily Water Consumption (L)"
            name="water"
            value={formValues.water}
            onChange={handleInputChange}
            autoFocus
          />
        ) : null}

        {/* Medication Field */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Medication: {activityData.medication || "N/A"}</Typography>
          <IconButton onClick={() => handleEditToggle("medication")}>
            <EditIcon />
          </IconButton>
        </Box>
        {editMode.medication ? (
          <TextField
            {...formFieldStyles}
            label="Have You Followed Medication?"
            name="medication"
            value={formValues.medication}
            onChange={handleInputChange}
            autoFocus
          />
        ) : null}

        {/* Heart Rate Field */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Heart Rate: {activityData.heartRate || "N/A"}</Typography>
          <IconButton onClick={() => handleEditToggle("heartRate")}>
            <EditIcon />
          </IconButton>
        </Box>
        {editMode.heartRate ? (
          <TextField
            {...formFieldStyles}
            label="Heart Rate (bpm)"
            name="heartRate"
            value={formValues.heartRate}
            onChange={handleInputChange}
            autoFocus
          />
        ) : null}

        {/* Weight Field */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2">Weight: {activityData.weight || "N/A"}</Typography>
          <IconButton onClick={() => handleEditToggle("weight")}>
            <EditIcon />
          </IconButton>
        </Box>
        {editMode.weight ? (
          <TextField
            {...formFieldStyles}
            label="Weight (kg)"
            name="weight"
            value={formValues.weight}
            onChange={handleInputChange}
            autoFocus
          />
        ) : null}
      </Box>

      <Box>
        <Typography {...typographyStyles.header}>Enter Your Information</Typography>
        <Grid container spacing={2}>
          {/* Step Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              {...formFieldStyles}
              label="Steps Taken"
              name="steps"
              value={formValues.steps}
              onChange={handleInputChange}
            />
          </Grid>
          {/* Water Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              {...formFieldStyles}
              label="Daily Water Consumption (L)"
              name="water"
              value={formValues.water}
              onChange={handleInputChange}
            />
          </Grid>
          {/* Medication Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              {...formFieldStyles}
              label="Have You Followed Medication?"
              name="medication"
              value={formValues.medication}
              onChange={handleInputChange}
            />
          </Grid>
          {/* Heart Rate Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              {...formFieldStyles}
              label="Heart Rate (bpm)"
              name="heartRate"
              value={formValues.heartRate}
              onChange={handleInputChange}
            />
          </Grid>
          {/* Weight Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              {...formFieldStyles}
              label="Weight (kg)"
              name="weight"
              value={formValues.weight}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
              sx={{ py: 1.5 }}
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
