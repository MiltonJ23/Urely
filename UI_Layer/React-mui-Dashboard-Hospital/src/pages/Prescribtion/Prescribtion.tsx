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

interface PrescriptionProps {
  patient?: {
    firstName: string;
    lastName: string;
    age: number;
    bloodGroup: string;
    diseases: string;
    doctorName: string;
    doctorEmail: string;
    doctorPhone: string;
  };
  prescriptions?: {
    medication: string;
    dosage: string;
    duration: string;
    instructions: string;
  }[];
}

const Prescription: React.FC<PrescriptionProps> = ({
  patient,
  prescriptions,
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Prescription" />
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
              Prescription
            </Typography>
            <Divider sx={{ mb: 4 }} />
            {patient ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Patient Information
                </Typography>
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
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 4, mb: 4 }} />
                <Typography variant="h6" gutterBottom>
                  Prescription Details
                </Typography>
                {prescriptions && prescriptions.length > 0 ? (
                  prescriptions.map((prescription, index) => (
                    <Paper
                      key={index}
                      sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5" }}
                    >
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>Medication:</strong> {prescription.medication}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>Dosage:</strong> {prescription.dosage}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>Duration:</strong> {prescription.duration}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        <strong>Instructions:</strong>{" "}
                        {prescription.instructions}
                      </Typography>
                    </Paper>
                  ))
                ) : (
                  <Typography variant="body1" align="center">
                    No prescriptions available.
                  </Typography>
                )}
              </>
            ) : (
              <Typography variant="body1" align="center">
                No patient information available.
              </Typography>
            )}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Prescription;
