import React, { useState } from 'react';
import {
  Container,
  Typography,
  Switch,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormGroup,
} from '@mui/material';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [privacy, setPrivacy] = useState({
    activityTracking: false,
    shareData: false,
  });
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handlePrivacyChange = (event) => {
    setPrivacy({
      ...privacy,
      [event.target.name]: event.target.checked,
    });
  };

  const handlePrivacyDialogOpen = () => {
    setPrivacyDialogOpen(true);
  };

  const handlePrivacyDialogClose = () => {
    setPrivacyDialogOpen(false);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      {/* Notifications */}
      <Grid container spacing={3} style={{ marginBottom: '1rem' }}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                color="primary"
              />
            }
            label="Enable Notifications"
          />
        </Grid>
      </Grid>

      {/* Language Settings */}
      <Grid container spacing={3} style={{ marginBottom: '1rem' }}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Language
          </Typography>
          <Select
            value={language}
            onChange={handleLanguageChange}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="de">German</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Privacy Settings */}
      <Grid container spacing={3} style={{ marginBottom: '1rem' }}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Privacy Preferences
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={privacy.activityTracking}
                  onChange={handlePrivacyChange}
                  name="activityTracking"
                />
              }
              label="Allow Activity Tracking"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={privacy.shareData}
                  onChange={handlePrivacyChange}
                  name="shareData"
                />
              }
              label="Share Data with Third Parties"
            />
          </FormGroup>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrivacyDialogOpen}
            style={{ marginTop: '1rem' }}
          >
            View Privacy Policy
          </Button>
        </Grid>
      </Grid>

      {/* Privacy Policy Dialog */}
      <Dialog open={privacyDialogOpen} onClose={handlePrivacyDialogClose}>
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            This app values your privacy. We do not share your data without
            consent. By enabling tracking, you allow us to provide personalized
            features.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrivacyDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings;