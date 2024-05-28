import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Main from "../layouts/Main";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import Members from "../pages/Members/Members";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import SlipIssue from "../pages/SlipIssue/SlipIssue";
import SlipIssueQueue from "../pages/SlipIssueQueue/SlipIssueQueue";
import Users from "../pages/Users/Users";
import AdminRoute from "./AdminRoute";
import OperatorRoute from "./OperatorRoute";
import PrivateRoute from "./PrivateRoute";
import ViewerRoute from "./ViewerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <ViewerRoute>
              <SlipIssueQueue />
            </ViewerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "slip-issue",
        element: (
          <PrivateRoute>
            <OperatorRoute>
              <SlipIssue />
            </OperatorRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Members />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Users />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "slip-issue",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SlipIssue />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "slip-issue-queue",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SlipIssueQueue />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Settings />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Profile />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
