import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import { API_ENDPOINT } from "../config/api";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const loginUser = async (reqUser) => {
    setIsLoading(true);
    try {
      const loginUser = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}${API_ENDPOINT.USER_LOGIN}`,
        reqUser,
        {
          withCredentials: true,
        }
      );
      const result = loginUser.data;
      if (!result?.data?.UserID) {
        toast.error("Invalid Username or Password");
        setUser(null);
        setError("Invalid Username or Password");
        setIsLoading(false);
        return;
      }

      toast.success(result?.message || "Login Successful");
      setError(null);
      setUser(result?.data);
      setIsLoading(false);
      return result?.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid Username or Password"
      );
      setIsLoading(false);
      setError(error?.response?.data?.message);
    }
  };

  const logoutUser = async () => {
    setIsLoading(true);
    try {
      await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}${API_ENDPOINT.USER_LOGOUT}`,
        {
          withCredentials: true,
        }
      );
      setUser(null);
    } catch (error) {
      //
    }

    setIsLoading(false);
  };

  const authInfo = { isLoading, error, user, loginUser, logoutUser };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.array,
};

export default AuthProvider;
