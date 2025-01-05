import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Container,
  Toolbar,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import Appbar from "../../components/Appbar";

interface MedicalRecordProps {
  patient?: {
    firstName: string;
    lastName: string;
    age: number;
    bloodGroup: string;
    diseases: string;
    patientHistory: string;
    doctorName: string;
    doctorEmail: string;
    doctorPhone: string;
    attachments: string[];
    handledBy: string;
  };
}

const MedicalRecord: React.FC<MedicalRecordProps> = ({ patient }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Medical Record" />
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
              Medical Record
            </Typography>
            <Divider sx={{ mb: 4 }} />
            {patient ? (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>First Name:</strong> {patient.firstName}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Last Name:</strong> {patient.lastName}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Age:</strong> {patient.age}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Blood Group:</strong> {patient.bloodGroup}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Diseases:</strong> {patient.diseases}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Patient History:</strong> {patient.patientHistory}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Doctor's Name:</strong> {patient.doctorName}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Doctor's Email:</strong> {patient.doctorEmail}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Doctor's Phone:</strong> {patient.doctorPhone}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Handled By:</strong> {patient.handledBy}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Attachments:</strong>
                  </Typography>
                  <ul>
                    {patient.attachments.map((attachment, index) => (
                      <li key={index}>
                        <Typography variant="body2">{attachment}</Typography>
                      </li>
                    ))}
                  </ul>
                </Grid>
              </Grid>
            ) : (
              <Typography variant="body1" align="center">
                No medical record available.
              </Typography>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default MedicalRecord;
