// import React from "react";
// import { Typography } from "@mui/material";

// const Recommendations: React.FC = () => {
//   return (
//     <div>
//       <Typography variant="h6">Recent Recommendations</Typography>
//       <Typography variant="body2">
//         Drink more water, aim for 8 glasses a day!
//       </Typography>
//     </div>
//   );
// };

// export default Recommendations;
import React from "react";
import { Typography, Box } from "@mui/material";

// Define props for the Recommendations component
interface RecommendationsProps {
  activityMinutes: number; // Total activity minutes for the day
  waterGlasses: number; // Water consumption in glasses
}

const Recommendations: React.FC<RecommendationsProps> = ({
  activityMinutes,
  waterGlasses,
}) => {
  const activityMessage =
    activityMinutes < 30
      ? "Try to get at least 30 minutes of exercise today!"
      : "Great job staying active today!";

  const waterMessage =
    waterGlasses < 8
      ? "Drink more water, aim for 8 glasses a day!"
      : "You're well-hydrated! Keep it up!";

  return (
    <Box mt={3}>
      <Typography variant="h6" gutterBottom>
        Recommendations
      </Typography>
      <Typography variant="body2">{activityMessage}</Typography>
      <Typography variant="body2">{waterMessage}</Typography>
    </Box>
  );
};

export default Recommendations;
