import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ActivityList from './ActivityList';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../../../app/layout/loadingComponent';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect(() => {
      if(activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities])

    if (activityStore.loadingInitial) return <LoadingComponent />
    
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
            <h2>Activity Filters</h2>
          </Item>
        </Grid>
      </Grid>
    )
})