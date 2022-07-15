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
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/ServerError';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <ThemeProvider theme={darkTheme}>
      <main>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
          <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='*' element={
                <>
                  <NavBar />
                  <Container 
                    style={{marginTop: '7em'}}
                  >
                    <Routes>
                      <Route path='/activities' element={<ActivityDashboard />} />
                      <Route path='/activities/:id' element={<ActivityDetails />} />
                      <Route path='/createActivity' element={<ActivityForm />} />
                      <Route path='/manage/:id' element={<ActivityForm />} />
                      <Route path='/errors' element={<TestErrors />} />
                      <Route path='/server-error' element={<ServerError />} />
                      <Route path='*' element={<NotFound />} />
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
