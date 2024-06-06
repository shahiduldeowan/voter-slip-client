import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { API_ENDPOINT } from "../config/api";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
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

  const authClear = () => {
    setUser(null);
    setError(null);
    setIsLoading(false);
  };

  const logoutUser = async () => {
    setIsLogoutLoading(true);
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

    setIsLogoutLoading(false);
  };

  useEffect(() => {
    const checkAuthUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}${API_ENDPOINT.AUTH_STATUS}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const result = await res.json();
        const myUser = result.data;
        if (myUser?.UserID) {
          setUser(myUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthUser();
  }, []);

  const authInfo = {
    isLoading,
    isLogoutLoading,
    error,
    user,
    loginUser,
    logoutUser,
    authClear,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
