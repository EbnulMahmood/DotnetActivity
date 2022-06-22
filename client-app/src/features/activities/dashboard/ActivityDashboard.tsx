import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ActivityDashboard({activities, selectedActivity, 
  selectActivity, cancelSelectActivity, editMode, openForm, closeForm, 
  createOrEdit, deleteActivity}: Props) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={6} md={7}>
          <Item>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <Divider />
              <nav aria-label="main">
                <ActivityList 
                  activities={activities}
                  selectActivity={selectActivity}
                  deleteActivity={deleteActivity}
                />
              </nav>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6} md={5}>
          <Item>
            {selectedActivity && !editMode &&
            <ActivityDetails 
              activity={selectedActivity} 
              cancelSelectActivity={cancelSelectActivity}
              openForm={openForm}
            />}
          </Item>
          <Divider />
          <Item>
            {editMode &&
            <ActivityForm 
              closeForm={closeForm}
              activity={selectedActivity}
              createOrEdit={createOrEdit}
            />}
          </Item>
        </Grid>
      </Grid>
    )
}