import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
