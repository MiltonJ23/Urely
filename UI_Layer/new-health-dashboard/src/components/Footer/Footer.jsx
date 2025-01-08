import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => (
  <Box style={styles.footer}>
    <Typography variant="body2">© 2025 Activity Logger Inc.</Typography>
  </Box>
);

const styles = {
  footer: {
    width: '100%',
    padding: '1rem',
    textAlign: 'center',
    backgroundColor: '#f4f4f4',
    color: 'black',
    position: 'fixed', // Ensures it's fixed at the bottom
    bottom: 0,
  },
};

export default Footer;
