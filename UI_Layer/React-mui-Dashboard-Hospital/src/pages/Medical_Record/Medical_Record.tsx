import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  Container,
  Toolbar,
} from "@mui/material";
import Appbar from "../../components/Appbar";

interface MedicalReportData {
  medication: string;
  date: string;
  duration: string;
  price: string;
  doctorNotes: string;
}

const MedicalReport: React.FC = () => {
  const [formData, setFormData] = useState<MedicalReportData>({
    medication: "",
    date: "",
    duration: "",
    price: "",
    doctorNotes: "",
  });

  const [submittedReports, setSubmittedReports] = useState<MedicalReportData[]>(
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedReports([...submittedReports, formData]);
    setFormData({
      medication: "",
      date: "",
      duration: "",
      price: "",
      doctorNotes: "",
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Medical Report" />
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
            <Typography variant="h5" align="center" gutterBottom>
              Medical Report Form
            </Typography>
            <Divider sx={{ mb: 4 }} />
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Medication"
                    name="medication"
                    value={formData.medication}
                    onChange={handleInputChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 7 days"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., $50"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Doctor Notes"
                    name="doctorNotes"
                    value={formData.doctorNotes}
                    onChange={handleInputChange}
                    placeholder="Additional notes or instructions from the doctor"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" fullWidth>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>

          {submittedReports.length > 0 && (
            <Paper sx={{ mt: 4, p: 4 }}>
              <Typography variant="h6" align="center" gutterBottom>
                Submitted Medical Reports
              </Typography>
              <Divider sx={{ mb: 4 }} />
              {submittedReports.map((report, index) => (
                <Paper sx={{ p: 2, mb: 2 }} key={index}>
                  <Typography variant="subtitle1">
                    <strong>Medication:</strong> {report.medication}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Date:</strong> {report.date}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Duration:</strong> {report.duration}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Price:</strong> {report.price}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Doctor Notes:</strong> {report.doctorNotes || "N/A"}
                  </Typography>
                </Paper>
              ))}
            </Paper>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default MedicalReport;
