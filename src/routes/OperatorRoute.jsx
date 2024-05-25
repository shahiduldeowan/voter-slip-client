import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const OperatorRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (user?.RoleName === "Operator") return children;
  return <Navigate to="/not-found" />;
};

OperatorRoute.propTypes = {
  children: PropTypes.element,
};

export default OperatorRoute;
