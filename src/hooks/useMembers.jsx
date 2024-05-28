import { API_ENDPOINT } from "../config/api";
import useFetchData from "./useFetchData";

const useMembers = () => {
  return useFetchData({
    queryKey: "members",
    endpoint: API_ENDPOINT.GET_MEMBERS,
  });
};

export default useMembers;
