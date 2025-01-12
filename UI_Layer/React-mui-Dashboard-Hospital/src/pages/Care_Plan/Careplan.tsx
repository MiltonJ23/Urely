import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";

// Example Instructions
const careInstructions = [
  "Take prescribed medication on time, every day.",
  "Stay hydrated and drink at least 8 glasses of water daily.",
  "Eat a balanced diet rich in fruits and vegetables.",
  "Avoid stressful activities; practice relaxation techniques like yoga.",
  "Ensure 7-8 hours of sleep each night for proper recovery.",
  "Attend all follow-up appointments with your healthcare provider.",
  "Monitor your symptoms and report any changes immediately.",
  "Engage in light physical activities or exercises as advised by your doctor.",
  "Avoid smoking and alcohol to promote faster healing.",
  "Engage in positive activities that bring joy and reduce stress.",
  "Try breathing exercises or meditation to relax your mind.",
  "Maintain a positive mindset to improve your overall well-being.",
  "Keep a journal of your recovery progress for reflection.",
  "Get plenty of fresh air and natural sunlight for optimal health.",
  "Take time to connect with loved ones for emotional support.",
];

const CarePlan: React.FC = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 3, display: "flex", flexDirection: "column" }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{ color: "#1976d2" }}
                >
                  Recovery Care Plan
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Instructions to Follow:
                </Typography>
                <List sx={{ bgcolor: "#f4f6f8", borderRadius: "8px", p: 2 }}>
                  {careInstructions.map((instruction, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        bgcolor: "#e3f2fd",
                        mb: 1,
                        borderRadius: "8px",
                        boxShadow: 1,
                      }}
                    >
                      <ListItemText primary={`• ${instruction}`} />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ mt: 3, mb: 3 }} />
                <Box mt={3} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#1976d2" }}
                  >
                    Acknowledge
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default CarePlan;
