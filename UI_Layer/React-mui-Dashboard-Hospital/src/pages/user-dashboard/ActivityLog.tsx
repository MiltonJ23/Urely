import React from "react";
import { Typography } from "@mui/material";

const ActivityLog: React.FC = () => {
  return (
    <div>
      <Typography variant="h6">Activity Log</Typography>
      <Typography variant="body2">You walked 2000 steps today.</Typography>
    </div>
  );
};

export default ActivityLog;
