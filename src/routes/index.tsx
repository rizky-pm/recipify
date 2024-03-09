import About from '@/pages/About';
import Home from '@/pages/Home';
import Meal from '@/pages/Meal';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/meal/:mealId',
    element: <Meal />,
  },
]);
