import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Appbar from "../../components/Appbar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {
  Avatar,
  Typography,
  Grid,
  Box,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LatestAppointments from "../Dashboard/LatestAppointments";
import PieChart from "./PieChart";

// Define TypeScript interfaces
interface ProfileData {
  avatarUrl: string;
  name: string;
  specialization: string;
  biography: string;
  email: string;
  contactNo: string;
  patients: number | string;
  experience: number | string;
}

interface InfoItem {
  icon: JSX.Element;
  title: string;
  value: string | number;
}

export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [infoData, setInfoData] = useState<InfoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch profile data
  const fetchProfileData = async () => {
    const domain_name = process.env.REACT_APP_API_URL || "http://localhost:8000";

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${domain_name}/api/appointments/doctors/`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch: ${response.status} ${response.statusText}`
        );
      }

      const data: ProfileData[] = await response.json(); // Expecting an array

      // Default Profile when no doctors are found
      const defaultProfile: ProfileData = {
        avatarUrl: "https://via.placeholder.com/100", // Placeholder image
        name: "N/A",
        specialization: "N/A",
        biography:
          "No doctors available at the moment. Please check again later.",
        email: "N/A",
        contactNo: "N/A",
        patients: 0,
        experience: 0,
      };

      // Choose a doctor or fallback to default
      const selectedDoctor =
        data.length > 0
          ? data[Math.floor(Math.random() * data.length)]
          : defaultProfile;

      // console.log("Selected Doctor:", selectedDoctor);

      setProfileData(selectedDoctor);

      // Construct info data dynamically from profile data
      setInfoData([
        {
          icon: <EmailIcon />,
          title: "Email",
          value: selectedDoctor.email || "N/A",
        },
        {
          icon: <PhoneIcon />,
          title: "Contact no",
          value: selectedDoctor.contactNo || "N/A",
        },
        {
          icon: <PeopleIcon />,
          title: "Successful Patients",
          value: selectedDoctor.patients || "N/A",
        },
        {
          icon: <MedicalServicesIcon />,
          title: "Experience",
          value: selectedDoctor.experience || "N/A",
        },
      ]);
    } catch (error) {
      console.error("Error fetching profile data:", error);

      // Set default profile if an error occurs
      setProfileData({
        avatarUrl: "https://via.placeholder.com/100",
        name: "Dr. Placeholder",
        specialization: "Unavailable",
        biography: "We encountered an issue retrieving doctor data.",
        email: "N/A",
        contactNo: "N/A",
        patients: 0,
        experience: 0,
      });

      setInfoData([
        { icon: <EmailIcon />, title: "Email", value: "N/A" },
        { icon: <PhoneIcon />, title: "Contact no", value: "N/A" },
        { icon: <PeopleIcon />, title: "Successful Patients", value: "N/A" },
        { icon: <MedicalServicesIcon />, title: "Experience", value: "N/A" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Handle loading state
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="warning">{error}</Alert>
      </Box>
    );
  }

  // Handle empty profile data
  if (!profileData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="info">No profile data available</Alert>
      </Box>
    );
  }

  const { avatarUrl, name, specialization, biography } = profileData;

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar appBarTitle="Profile" />
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
          <Grid container spacing={3}>
            {/* Profile Info */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 445,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack spacing={2} direction="column" alignItems="center">
                  <Avatar
                    src={avatarUrl}
                    sx={{ height: "100px", width: "100px" }}
                  />
                  <Typography variant="h4">{name}</Typography>
                  <Typography variant="h6">{specialization}</Typography>
                </Stack>
              </Paper>
            </Grid>

            {/* Biography & Information */}
            <Grid item xs={12} md={8} lg={8}>
              <Box sx={{ flexGrow: 0 }}>
                <Grid item xs={12}>
                  <Paper
                    sx={{ display: "flex", flexDirection: "column", mb: 1 }}
                  >
                    <Typography variant="body1" gutterBottom sx={{ m: 1.5 }}>
                      {biography}
                    </Typography>
                  </Paper>
                </Grid>

                {/* Contact & Experience Info */}
                <Grid container spacing={2}>
                  {infoData.map((item, index) => (
                    <Grid key={index} item xs={12} md={6} lg={6}>
                      <Paper
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: 150,
                        }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={1}
                          >
                            <IconButton
                              size="large"
                              aria-label={item.title}
                              color="secondary"
                            >
                              {item.icon}
                            </IconButton>
                            <Stack alignItems="center">
                              <Typography
                                component="h2"
                                align="center"
                                variant="h6"
                                color="primary"
                                gutterBottom
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                component="p"
                                align="center"
                                variant="h5"
                              >
                                {item.value}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>

            {/* Latest Appointments */}
            <Grid item xs={12} md={8} lg={8}>
              <LatestAppointments />
            </Grid>

            {/* Pie Chart */}
            <Grid item xs={12} md={4} lg={4}>
              <Typography
                component="h2"
                align="left"
                variant="h6"
                gutterBottom
                color="primary"
              >
                Chart
              </Typography>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 370,
                }}
              >
                <PieChart />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
