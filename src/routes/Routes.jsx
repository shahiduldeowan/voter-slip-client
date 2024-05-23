import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Main from "../layouts/Main";
import Login from "../pages/Login/Login";
import Members from "../pages/Members/Members";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import SlipIssue from "../pages/SlipIssue/SlipIssue";
import SlipIssueQueue from "../pages/SlipIssueQueue/SlipIssueQueue";
import Users from "../pages/Users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <SlipIssueQueue />,
      },
      {
        path: "/slip-issue",
        element: <SlipIssue />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Members />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/slip-issue",
        element: <SlipIssue />,
      },
      {
        path: "/slip-issue-queue",
        element: <SlipIssueQueue />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
