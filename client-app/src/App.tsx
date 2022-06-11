import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function App() {
  const [activities, SetActivities] = useState([]);
  const URL = 'http://localhost:5000/api/activities';
  useEffect(() => {
    axios.get(URL).then(response => {
      console.log(response);
      SetActivities(response.data);
    })
  }, [])
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Divider />
        <nav aria-label="main">
          <List>
            {activities.map((activity: any) => (
              <ListItem key={activity.id} disablePadding>
                <ListItemText primary={activity.title} />
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    </div>
  );
}

export default App;
