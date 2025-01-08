import React from 'react';
import { Box, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Assignment, CalendarViewWeek, Opacity, Settings } from '@mui/icons-material';

const styles = {
  listItemText: {
    color: 'black',
    cursor: 'pointer',
  },
  sidebar: {
    width: '10%',
    Opacity: 1,
    zIndex: 10,
    
  }
};

const Sidebar = () => (
  <Box className="sidebar" >
    <List>
      <ListItem button>
        <ListItemIcon>
          <Assignment />
        </ListItemIcon>
        <ListItemText primary="Daily Activity" sx={styles.listItemText} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <CalendarViewWeek />
        </ListItemIcon>
        <ListItemText primary="Weekly Summary" sx={styles.listItemText} />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" sx={styles.listItemText} />
      </ListItem>
    </List>
  </Box>
);

export default Sidebar;
