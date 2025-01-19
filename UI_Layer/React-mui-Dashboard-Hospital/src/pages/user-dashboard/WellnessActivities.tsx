import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography, CircularProgress } from "@mui/material";

interface Activity {
  id: number;
  description: string;
  date: string;
}

const WellnessActivities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setActivities([
        { id: 1, description: "Meditation for 15 minutes", date: "2025-01-18" },
        { id: 2, description: "Drank 2 liters of water", date: "2025-01-19" },
        { id: 3, description: "Walked 10,000 steps", date: "2025-01-19" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {activities.map((activity) => (
        <ListItem key={activity.id}>
          <ListItemText
            primary={activity.description}
            secondary={`Date: ${activity.date}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default WellnessActivities;
