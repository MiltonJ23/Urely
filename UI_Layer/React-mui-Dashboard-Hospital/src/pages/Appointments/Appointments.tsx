import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Appbar from "../../components/Appbar";
import AppointmentDialog from "./AppointmentDialog";
import { appointmentsData } from "../../mockData";
import AppointmentTableData from "./AppointmentTableData";
import axios from "axios";
import apiClient from "../../components/ApiClient";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const domain_name = process.env.REACT_APP_API_URL || "http://localhost:8000";

  const fetchAppointments = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get(`${domain_name}/api/appointments/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('appointments', response.data);
      setAppointments(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };
  
  useEffect(() => {
    console.log("useEffect triggered");
    const fetchData = async () => {
      await fetchAppointments();
    };
    fetchData();
  }, []); // Empty dependency array ensures this only runs once
  
  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Appointment" />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto"
        }}
      >
        <Toolbar />

        <Container sx={{ mt: 4, mb: 4 }}>
          <AppointmentDialog
            appointments={appointments}
            setAppointments={setAppointments}
          />
          <Grid
            container
            spacing={2}
            sx={{ marginleft: "10px", marginTop: "40px" }}
          >
            <AppointmentTableData appointments={appointments} />
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Appointments;
