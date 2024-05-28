import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { authClear } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          authClear();
          navigate("/login");
        }
        return Promise.reject(err);
      }
    );
  }, [authClear, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
