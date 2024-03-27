import ErrorBoundary from "@/components/ErrorBoundary";
import RecipeListing from "@/components/RecipeListing";
import Home from "@/pages/Home";
import Meal from "@/pages/Meal";
import Offline from "@/pages/Offline";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Home />
      </ErrorBoundary>
    ),
  },
  {
    path: "/meal/:mealId",
    element: (
      <ErrorBoundary>
        <Meal />
      </ErrorBoundary>
    ),
  },
  {
    path: "/category/:categoryName",
    element: <RecipeListing />,
  },
  {
    path: "/country/:countryName",
    element: <RecipeListing />,
  },
  {
    path: "/offline",
    element: <Offline />,
  },
]);
