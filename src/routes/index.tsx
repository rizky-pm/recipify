import { createBrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import MainPage from '../pages/Main';
import SigninPage from '../pages/Signin';
import SignupPage from '../pages/Signup';

import Navbar from '../components/Navbar';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <MainPage />
      </>
    ),
  },
  {
    path: '/signin',
    element: <SigninPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
]);

export default router;
