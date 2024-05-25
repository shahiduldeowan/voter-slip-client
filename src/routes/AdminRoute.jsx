import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (user?.RoleName === "Admin" || user?.RoleName === "Supervisor") {
    return children;
  }
  return <Navigate to="/not-found" />;
};

AdminRoute.propTypes = {
  children: PropTypes.element,
};

export default AdminRoute;
