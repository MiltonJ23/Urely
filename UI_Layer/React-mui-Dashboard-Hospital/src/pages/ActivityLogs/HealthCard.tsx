import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Title from "../../components/Title";

import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';

export default function HealthCard(props: {
  icon: any;
  title: any;
  value: any;
  unit: any;
}) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Stack>
          <IconButton size="large" aria-label="icon" color="secondary">
            {props.icon}
          </IconButton>
          <Title>{props.title}</Title>
          <Typography component="p" align="center" variant="h6">
            {`${props.value} ${props.unit}`}
          </Typography>
          <IconButton size="large" aria-label="icon" color="secondary" style={{justifyContent: 'right', left: 50, top: 2, alignSelf: 'end'}}>
            <SettingsVoiceIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
