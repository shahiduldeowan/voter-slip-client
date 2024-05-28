import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "../config/api";
import useAxiosSecure from "./useAxiosSecure";

const useMembers = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const response = await axiosSecure.get(API_ENDPOINT.GET_MEMBERS);
      return response.data?.data;
    },
  });
};

export default useMembers;
