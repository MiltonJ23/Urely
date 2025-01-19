import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "../../components/Title";
import AppointmentTableData from "../Appointments/AppointmentTableData";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Box, Alert } from "@mui/material";
import apiClient from "../../components/ApiClient";
import axios from "axios";

// Define TypeScript interfaces
interface Appointment {
  id: number;
  patientName: string;
  date: string;
  status: string;
}

export default function LatestAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch appointments from the backend
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await apiClient.get("/appointments/recent", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data: Appointment[] = response.data; 
  
        // Handle empty appointments
        if (data.length === 0) {
          setError("No recent appointments found.");
        } else {
          setAppointments(data);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          setError(`Error: ${error.response.status} - ${error.response.data.message || "Failed to fetch appointments"}`);
        } else {
          setError("No appointments yet.");
        } 
      } finally {
        setLoading(false);
      }
    };
  
    fetchAppointments();
  }, []);

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
    navigate(`/appointments`);
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="info">{error}</Alert>
        <Link color="primary" onClick={preventDefault} sx={{ mt: 2 }}>
          See all appointments
        </Link>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Typography component="h2" align="left" variant="h6" gutterBottom color="primary">
        Recent Appointments
      </Typography>
      <AppointmentTableData appointments={appointments} />
      <Link color="primary" onClick={preventDefault} sx={{ mt: 2 }}>
        See all appointments
      </Link>
    </React.Fragment>
  );
}