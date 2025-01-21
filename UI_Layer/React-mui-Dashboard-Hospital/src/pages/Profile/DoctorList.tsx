import * as React from "react";
import Paper from "@mui/material/Paper";
import Appbar from "../../components/Appbar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { Avatar, Grid, Box } from "@mui/material";
import AddDoctorDialog from "./AddDoctorDialog";
import axios from "axios"; // Import axios for making API requests

export default function DoctorList() {
  const [doctors, setDoctors] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);  // For showing loading state
  const [error, setError] = React.useState<string | null>(null);  // For handling errors

  React.useEffect(() => {
    const domain_name = process.env.REACT_APP_API_URL || 'http://localhost';
    const fetchDoctors = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await axios.get(`${domain_name}:8000/api/appointments/doctors/`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        setDoctors(response.data); 
      } catch (err: any) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors. Please try again.");
      } finally {
        setLoading(false);  // Stop the loading state once the data is fetched
      }
    };

    fetchDoctors();
  }, []);  // Fetch doctors when the component mounts

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Doctor List" />
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
          <AddDoctorDialog
            doctors={doctors}
            setDoctors={setDoctors}
          />
          <Grid
            container
            spacing={2}
            sx={{ marginLeft: "10px", marginTop: "40px" }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="doctor table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>DOCTOR NAME</TableCell>
                    <TableCell>SPECIALIST</TableCell>
                    <TableCell>SEX</TableCell>
                    <TableCell>PHONE NO</TableCell>
                    <TableCell>EDUCATION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">Loading...</TableCell>
                    </TableRow>
                  ) : error ? (
                    <TableRow>
                      <TableCell colSpan={6} align="center">{error}</TableCell>
                    </TableRow>
                  ) : doctors.length > 0 ? (
                    doctors.map((doctor: any, index: number) => (
                      <TableRow
                        key={index}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <TableCell align="right">
                          <Avatar
                            src={"https://i.pravatar.cc/300"}
                            sx={{ height: "25%" }}
                          />
                        </TableCell>
                        <TableCell>{doctor.fullName}</TableCell>
                        <TableCell>{doctor.specialist}</TableCell>
                        <TableCell>{doctor.gender}</TableCell>
                        <TableCell>{doctor.phone}</TableCell>
                        <TableCell>{doctor.education}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No doctors available.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
