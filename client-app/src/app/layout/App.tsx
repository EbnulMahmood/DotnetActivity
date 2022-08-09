import React, { useEffect } from 'react';
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
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './loadingComponent';
import ModalContainer from '../common/modal/ModalContainer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const {commonStore: {token, setAppLoaded, appLoaded},
         userStore: {getUser}} = useStore();

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [token, getUser, setAppLoaded])

  if (!appLoaded) return <LoadingComponent />

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
        <ModalContainer />
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
                      <Route path='/login' element={<LoginForm />} />
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
