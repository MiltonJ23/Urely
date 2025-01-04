import React from "react";
import { Typography } from "@mui/material";

const Recommendations: React.FC = () => {
  return (
    <div>
      <Typography variant="h6">Recent Recommendations</Typography>
      <Typography variant="body2">
        Drink more water, aim for 8 glasses a day!
      </Typography>
    </div>
  );
};

export default Recommendations;
