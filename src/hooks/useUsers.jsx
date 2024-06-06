import { useState } from "react";
import { API_ENDPOINT } from "../config/api";
import useAxiosSecure from "./useAxiosSecure";
import useFetchData from "./useFetchData";

const useUsers = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useFetchData({ queryKey: "users", endpoint: API_ENDPOINT.GET_ALL_USER });

  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const userRegister = async (userInfo) => {
    setIsRegisterLoading(true);
    // const body = JSON.stringify(userInfo);
    try {
      const { data } = await axiosSecure.post(
        API_ENDPOINT.USER_REGISTER,
        userInfo
      );

      refetch();
      setIsRegisterLoading(false);
      return data?.data?.UserID
        ? "User successfully created"
        : "Something went wrong";
    } catch (error) {
      setIsRegisterLoading(false);
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  };

  return { users, isLoading, refetch, userRegister, isRegisterLoading };
};

export default useUsers;
