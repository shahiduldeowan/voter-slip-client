import PropTypes from "prop-types";

import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const ViewerRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (user?.RoleName === "Viewer") return children;
  return <Navigate to="/not-found" />;
};

ViewerRoute.propTypes = {
  children: PropTypes.element,
};

export default ViewerRoute;
