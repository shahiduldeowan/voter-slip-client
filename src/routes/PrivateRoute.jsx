import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoute;
