// import React from "react";
// import { Card, CardContent, Typography } from "@mui/material";

// interface HealthCardProps {
//   icon: JSX.Element;
//   title: string;
//   value: string | number;
// }

// const HealthCard: React.FC<HealthCardProps> = ({ icon, title, value }) => {
//   return (
//     <Card>
//       <CardContent>
//         <Typography variant="h6" component="div">
//           {icon}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {title}
//         </Typography>
//         <Typography variant="h4">{value}</Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default HealthCard;
// src/components/HealthCard.tsx

import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface HealthCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const HealthCard: React.FC<HealthCardProps> = ({ icon, title, value }) => {
  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column", height: 200 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ mt: 2 }}>
        {value}
      </Typography>
    </Paper>
  );
};

export default HealthCard;
