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
import AllLoanManage from "../components/Dashboard/Pages/Loans/AllLoanManage";

import SignupPending from "../pages/SignUp/SignupPending";
import AddLoan from "../components/Dashboard/Pages/Loans/AddLoan";
import ManageLoans from "../components/Dashboard/Pages/Loans/ManageLoans";
import PendingApplications from "../components/Dashboard/Pages/Loans/PendingApplications";
import ApprovedApplications from "../components/Dashboard/Pages/Loans/ApprovedApplications";
import MyLoans from "../components/Dashboard/Pages/Loans/MyLoans";
import LoanDetails from "../pages/Loans/LoanDetails";
import PaymentSucess from "../components/Dashboard/Pages/Payment/PaymentSucess";
import LoanApplications from "../components/Dashboard/Pages/Loans/LoanApplications";
import ApplyLoan from "../pages/Loans/ApplyLoan";
import PrivateRouteProvider from "../providers/PrivateRouteProvider";
import AdminRoute from "../providers/AdminRoute";
import ManagerRoute from "../providers/ManagerRoute";
import BorrowerMenu from "../components/Dashboard/Sidebar/Menu/BorrowerMenu";
import BorrowerRoute from "../providers/BorrowerRoute";

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
      { path: "/apply-loan", element: <ApplyLoan /> },
      {
        path: "/loan/:id",
        element: (
          <PrivateRouteProvider>
            <LoanDetails />
          </PrivateRouteProvider>
        ),
      },

      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signup-pending", element: <SignupPending /> },

      {
        path: "/user-profile/:email",
        element: (
          <PrivateRouteProvider>
            <UserProfile />
          </PrivateRouteProvider>
        ),
      },
      {
        path: "/edit-profile",
        element: (
          <PrivateRouteProvider>
            <EditProfile />
          </PrivateRouteProvider>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        path: "/dashboard/user-profile",
        element: (
          <PrivateRouteProvider>
            <Profile />
          </PrivateRouteProvider>
        ),
      },

      //LINK - admin route
      {
        path: "/dashboard/manage-users",
        element: (
          <PrivateRouteProvider>
            <AdminRoute>
              <ManageUser />
            </AdminRoute>
          </PrivateRouteProvider>
        ),
      },
      {
        path: "/dashboard/all-loan",
        element: (
          <PrivateRouteProvider>
            <AdminRoute>
              <AllLoanManage />
            </AdminRoute>
          </PrivateRouteProvider>
        ),
      },
      {
        path: "/dashboard/loan-applications",
        element: (
          <PrivateRouteProvider>
            <AdminRoute>
              <LoanApplications />
            </AdminRoute>
          </PrivateRouteProvider>
        ),
      },

      //LINK - manager route
      {
        path: "/dashboard/add-loan",
        element: (
          <PrivateRouteProvider>
            <ManagerRoute>
              <AddLoan />
            </ManagerRoute>
          </PrivateRouteProvider>
        ),
      },
      {
        path: "/dashboard/manage-loans",
        element: (
          <PrivateRouteProvider>
            <ManagerRoute>
              <ManageLoans />
            </ManagerRoute>
          </PrivateRouteProvider>
        ),
      },
      {
        path: "/dashboard/pending-loans",
        element: (
          <PrivateRouteProvider>
            <ManagerRoute>
              <PendingApplications />
            </ManagerRoute>
          </PrivateRouteProvider>
        ),
      },
      {
        path: "/dashboard/approved-loans",
        element: (
          <PrivateRouteProvider>
            <ManagerRoute>
              <ApprovedApplications />
            </ManagerRoute>
          </PrivateRouteProvider>
        ),
      },

      //LINK - borrower route
      {
        path: "/dashboard/my-loans/:email",
        element: (
          <PrivateRouteProvider>
            <BorrowerRoute>
              <MyLoans />
            </BorrowerRoute>
          </PrivateRouteProvider>
        ),
      },

      {
        path: "/dashboard/loan-applications/sucess-payment",
        element: (
          <PrivateRouteProvider>
            <PaymentSucess />
          </PrivateRouteProvider>
        ),
      },
    ],
  },
]);
