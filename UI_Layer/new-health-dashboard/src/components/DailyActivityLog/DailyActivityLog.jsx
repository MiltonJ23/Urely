import React, { useState } from 'react';
import { Box, TextField, IconButton, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Mic, Add } from '@mui/icons-material';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const DailyActivityLog = () => {
  const [activities, setActivities] = useState([]);
//   const { transcript, resetTranscript } = useSpeechRecognition();

  const handleAddActivity = () => {
    if (transcript) {
      setActivities([...activities, transcript]);
      resetTranscript(); // Reset the transcript after adding
    }
  };

//   const handleSpeechStart = () => {
//     SpeechRecognition.startListening({ continuous: true });
//   };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Daily Activity Log</Typography>
      <TextField
        label="Log Activity"
        variant="outlined"
        fullWidth
        value={transcript}
        InputProps={{
          endAdornment: (
            <IconButton onClick={handleSpeechStart}>
              <Mic />
            </IconButton>
          ),
        }}
        sx={{ marginTop: 2 }}
      />
      <IconButton
        color="primary"
        onClick={handleAddActivity}
        sx={{ marginTop: 2 }}
      >
        <Add />
      </IconButton>

      <List sx={{ marginTop: 2 }}>
        {activities.map((activity, index) => (
          <ListItem key={index}>
            <ListItemText primary={activity} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DailyActivityLog;
