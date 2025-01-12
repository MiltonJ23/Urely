import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Container,
  Toolbar,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import Appbar from "../../components/Appbar";

const PrescriptionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    bloodGroup: "",
    diseases: "",
    doctorName: "",
    doctorEmail: "",
    doctorPhone: "",
    medication: "",
    typeOfDrug: "",
    dosage: "",
    duration: "",
    instructions: "",
  });

  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Prescription Form" />
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
          <Paper sx={{ p: 4 }}>
            <IconButton component={Link} to="/patient-list" color="inherit">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" align="center" gutterBottom>
              Prescription Form
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <form onSubmit={handleSubmit}>
              <Typography variant="h6" gutterBottom>
                Patient Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Blood Group"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Diseases"
                    name="diseases"
                    value={formData.diseases}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ mt: 4, mb: 4 }} />
              <Typography variant="h6" gutterBottom>
                Doctor's Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Doctor's Name"
                    name="doctorName"
                    value={formData.doctorName}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Doctor's Email"
                    name="doctorEmail"
                    value={formData.doctorEmail}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Doctor's Phone"
                    name="doctorPhone"
                    value={formData.doctorPhone}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              </Grid>
              <Divider sx={{ mt: 4, mb: 4 }} />
              <Typography variant="h6" gutterBottom>
                Prescription Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Medication"
                    name="medication"
                    value={formData.medication}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Type of Drug"
                    name="typeOfDrug"
                    value={formData.typeOfDrug}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Dosage"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Instructions"
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 4 }}
              >
                Submit
              </Button>
            </form>
            {submittedData && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Submitted Prescription Data
                </Typography>
                <pre>{JSON.stringify(submittedData, null, 2)}</pre>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default PrescriptionForm;
