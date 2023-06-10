import { createBrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import MainPage from '../pages/Main';
import RecipePage from '../pages/RecipePage';
import SigninPage from '../pages/Signin';
import SignupPage from '../pages/Signup';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <MainPage />
        <Footer />
      </>
    ),
  },
  {
    path: '/recipe/:recipeId',
    element: (
      <>
        <Navbar />
        <RecipePage />
        <Footer />
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
