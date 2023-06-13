import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import MainPage from "../pages/Main";
import RecipePage from "../pages/RecipePage";
import SigninPage from "../pages/Signin";
import SignupPage from "../pages/Signup";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingBoundary from "../components/LoadingBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <LoadingBoundary>
          <MainPage />
        </LoadingBoundary>
      </>
    ),
  },
  {
    path: "/recipe/:recipeId",
    element: (
      <>
        <LoadingBoundary>
          <RecipePage />
        </LoadingBoundary>
      </>
    ),
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

export default router;
