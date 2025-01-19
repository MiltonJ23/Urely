import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography, CircularProgress } from "@mui/material";

interface Appointment {
  id: number;
  date: string;
  time: string;
  doctor: string;
}

const UpcomingAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAppointments([
        { id: 1, date: "2025-01-20", time: "10:00 AM", doctor: "Dr. Smith" },
        { id: 2, date: "2025-01-22", time: "2:00 PM", doctor: "Dr. Doe" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {appointments.map((appt) => (
        <ListItem key={appt.id}>
          <ListItemText
            primary={`Appointment with ${appt.doctor}`}
            secondary={`${appt.date} at ${appt.time}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default UpcomingAppointments;
