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
import ManageUser from "../components/Dashboard/Pages/ManageUser";
import AllLoanManage from "../components/Dashboard/Pages/AllLoanManage";
import LoanApplications from "../components/Dashboard/Pages/LoanApplications";
import SignupPending from "../pages/SignUp/SignupPending";
import AddLoan from "../components/Dashboard/Pages/Loans/AddLoan";
import ManageLoans from "../components/Dashboard/Pages/Loans/ManageLoans";
import PendingApplications from "../components/Dashboard/Pages/Loans/PendingApplications";
import ApprovedApplications from "../components/Dashboard/Pages/Loans/ApprovedApplications";
import MyLoans from "../components/Dashboard/Pages/Loans/MyLoans";
import LoanDetails from "../pages/Loans/LoanDetails";

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
      { path: "/loan/:id", element: <LoanDetails /> },

      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signup-pending", element: <SignupPending /> },

      { path: "/user-profile/:email", element: <UserProfile /> },
      { path: "/edit-profile", element: <EditProfile /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      { path: "/dashboard/user-profile", element: <Profile /> },

      { path: "/dashboard/manage-users", element: <ManageUser /> },
      { path: "/dashboard/all-loan", element: <AllLoanManage /> },
      { path: "/dashboard/loan-applications", element: <LoanApplications /> },

      { path: "/dashboard/add-loan", element: <AddLoan /> },
      { path: "/dashboard/manage-loans", element: <ManageLoans /> },
      { path: "/dashboard/pending-loans", element: <PendingApplications /> },
      { path: "/dashboard/approved-loans", element: <ApprovedApplications /> },

      { path: "/dashboard/my-loans", element: <MyLoans /> },
    ],
  },
]);
