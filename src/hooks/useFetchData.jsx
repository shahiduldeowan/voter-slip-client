import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useFetchData = ({ queryKey, endpoint }) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axiosSecure.get(endpoint);
      return response.data?.data;
    },
  });
};

export default useFetchData;
