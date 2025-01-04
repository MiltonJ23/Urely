import React from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

interface HealthAlertProps {
  alerts: { condition: string; alert: string }[];
}

const HealthAlert: React.FC<HealthAlertProps> = ({ alerts }) => {
  return (
    <div>
      <Typography variant="h6">Health Alerts</Typography>
      <List>
        {alerts.map((alert, index) => (
          <ListItem key={index}>
            <ListItemText primary={alert.condition} secondary={alert.alert} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default HealthAlert;
