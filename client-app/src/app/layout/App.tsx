import React, { useEffect } from 'react';
import NavBar from './NavBar';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './loadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent />

  return (
    <ThemeProvider theme={darkTheme}>
      <main>
        <NavBar />
        <Container style={{marginTop: '7em'}}>
          <ActivityDashboard />
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default observer(App);
