import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import UserProfile from "../pages/UserProfile/UserProfile";
import EditProfile from "../pages/UserProfile/EditProfile";
import AllLoans from "../pages/Loans/AllLoans";
import AboutUs from "../pages/AboutUs/AboutUs";
import Contact from "../pages/Contact/Contact";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../components/Dashboard/Pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      { index: true, Component: Home },

      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },

      { path: "/all-loans", element: <AllLoans /> },

      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/user-profile/:email", element: <UserProfile /> },
      { path: "/edit-profile", element: <EditProfile /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [{ path: "/dashboard/user-profile", element: <Profile /> }],
  },
]);
