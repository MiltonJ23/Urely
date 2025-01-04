import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface HealthCardProps {
  icon: JSX.Element;
  title: string;
  value: string | number;
}

const HealthCard: React.FC<HealthCardProps> = ({ icon, title, value }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {icon}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default HealthCard;
