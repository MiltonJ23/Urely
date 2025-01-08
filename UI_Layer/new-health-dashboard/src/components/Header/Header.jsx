import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => (
  <AppBar position="static" style={styles.appBar}>
    <Toolbar>
      <Typography variant="h6" style={styles.typography}>
        Activity Logger Dashboard
      </Typography>
    </Toolbar>
  </AppBar>
);

const styles = {
  appBar: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#1976d2', // Customize the AppBar color
  },
  typography: {
    margin: '0 auto', // Center the text horizontally
    textAlign: 'center',
  },
};

export default Header;
