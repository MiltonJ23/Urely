// Inside LatestAppointments.tsx

import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AppointmentTableData from "../Appointments/AppointmentTableData"; // Assuming this is correct
import { appointmentsData } from "../../mockData"; // Ensure this is available
import { useNavigate } from "react-router-dom";

const LatestAppointments = () => {
  const navigate = useNavigate();

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
    navigate(`/appointments`);
  }

  return (
    <React.Fragment>
      <Typography
        component="h2"
        align="left"
        variant="h6"
        gutterBottom
        color="primary"
      >
        Recent Appointments
      </Typography>
      <AppointmentTableData appointments={appointmentsData} />
      <Link color="primary" onClick={preventDefault} sx={{ mt: 2 }}>
        See all appointments
      </Link>
    </React.Fragment>
  );
};

export default LatestAppointments; // Ensure this is exported as default
