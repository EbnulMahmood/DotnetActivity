import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ActivityList from './ActivityList';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;
    return (
      <Grid container spacing={2}>
        <Grid item xs={6} md={7}>
          <Item>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <Divider />
              <nav aria-label="main">
                <ActivityList />
              </nav>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6} md={5}>
          <Item>
            {selectedActivity && !editMode &&
            <ActivityDetails />}
          </Item>
          <Divider />
          <Item>
            {editMode &&
            <ActivityForm />}
          </Item>
        </Grid>
      </Grid>
    )
})