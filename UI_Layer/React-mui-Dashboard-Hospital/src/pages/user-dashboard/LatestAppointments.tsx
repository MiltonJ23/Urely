// src/components/LatestAppointments.tsx
import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

interface Appointment {
  date: string;
  description: string;
}

const LatestAppointments: React.FC = () => {
  const appointments: Appointment[] = [
    { date: "2025-01-01", description: "Routine checkup" },
    { date: "2025-01-02", description: "Malaria test" },
    { date: "2025-01-03", description: "Blood pressure check" },
  ];

  return (
    <div>
      <h3>Latest Appointments</h3>
      <List>
        {appointments.map((appointment, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={appointment.date}
              secondary={appointment.description}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LatestAppointments;
