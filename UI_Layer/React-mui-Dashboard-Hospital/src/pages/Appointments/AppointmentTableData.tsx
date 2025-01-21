import React, { useEffect, useState } from "react";
import { Paper, Chip } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface Doctor {
  id: number;
  name: string;
}

interface Appointment {
  id: number;
  full_name: string;
  gender: string;
  phone: string;
  age: number;
  referred_by_doctor: number;
  assigned_doctor: number;
  appointment_date: string;
  status: string;
}

function AppointmentTableData({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorNames, setDoctorNames] = useState<{ [key: number]: string }>({});

  const domain_name = process.env.REACT_APP_API_URL || "http://localhost:8000";
  useEffect(() => {
    const fetchDoctors = async () => {
      const token = sessionStorage.getItem("authToken"); // Retrieve the token

      if (!token) {
        console.error("Authentication token is missing.");
        return;
      }

      try {
        const response = await fetch(
          `${domain_name}/api/appointments/doctors/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the Authorization header
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDoctors(data); // Set the list of doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const getDoctorNameById = async (doctorId: number): Promise<void> => {
    if (!doctorNames[doctorId]) {
      const token = sessionStorage.getItem("authToken"); // Retrieve the token

      if (!token) {
        console.error("Authentication token is missing.");
        return;
      }

      try {
        const response = await fetch(
          `${domain_name}/api/appointments/doctors/${doctorId}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the Authorization header
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setDoctorNames((prevNames) => ({
          ...prevNames,
          [doctorId]: data.name,
        }));
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="patient table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell>FULL NAME</TableCell>
            <TableCell>GENDER</TableCell>
            <TableCell>Phone no</TableCell>
            <TableCell>AGE</TableCell>
            <TableCell>REFERRED BY DR.</TableCell>
            <TableCell>APPOINTMENT DATE</TableCell>
            <TableCell>ASSIGNED DR.</TableCell>
            <TableCell>STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.length > 0 &&
            appointments.map((appointment: Appointment, index: number) => {
              getDoctorNameById(appointment.referred_by_doctor);
              getDoctorNameById(appointment.assigned_doctor);

              return (
                <TableRow
                  key={index}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <TableCell align="center">{appointment.id}</TableCell>
                  <TableCell>{appointment.full_name}</TableCell>
                  <TableCell>{appointment.gender}</TableCell>
                  <TableCell>{appointment.phone}</TableCell>
                  <TableCell>{appointment.age}</TableCell>
                  <TableCell>
                    {doctorNames[appointment.referred_by_doctor] ||
                      "Loading..."}
                  </TableCell>
                  <TableCell>{appointment.appointment_date}</TableCell>
                  <TableCell>
                    {doctorNames[appointment.assigned_doctor] || "Loading..."}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={appointment.status}
                      variant="outlined"
                      color={
                        appointment.status === "open" ? "success" : "error"
                      }
                      sx={{ textTransform: "uppercase" }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AppointmentTableData;
