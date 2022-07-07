import React from 'react';
import NavBar from './NavBar';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import ActivityForm from '../../features/activities/form/ActivityForm';
import HomePage from '../../features/home/HomePage';
import ActivityDetails from '../../features/activities/details/ActivityDetails';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <main>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='*' element={
                  <>
                    <NavBar />
                    <Container style={{marginTop: '7em'}}>
                      <Routes>
                        <Route path='/activities' element={<ActivityDashboard />} />
                        <Route path='/activities/:id' element={<ActivityDetails />} />
                        <Route path='/createActivity' element={<ActivityForm />} />
                        <Route path='/manage/:id' element={<ActivityForm />} />
                      </Routes>
                    </Container>
                  </>
                } />
            </Routes>
      </main>
    </ThemeProvider>
  );
}

export default observer(App);
