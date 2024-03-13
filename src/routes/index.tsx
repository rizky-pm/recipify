import RecipeListing from '@/components/RecipeListing';
import Home from '@/pages/Home';
import Meal from '@/pages/Meal';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/meal/:mealId',
    element: <Meal />,
  },
  {
    path: '/category/:categoryName',
    element: <RecipeListing />,
  },
  {
    path: '/country/:countryName',
    element: <RecipeListing />,
  },
]);
