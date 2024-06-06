import axios from "axios";
import { useState } from "react";
import { API_ENDPOINT } from "../config/api";
import { SLIP_STATUS } from "../config/constants";
import useAxiosSecure from "./useAxiosSecure";

const useVoter = () => {
  const [voter, setVoter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [printStatus, setPrintStatus] = useState(SLIP_STATUS.INITIAL);

  const axiosSecure = useAxiosSecure();

  const getVoterByQuery = async (query) => {
    setLoading(true);
    try {
      const result = await axiosSecure.get(
        `${API_ENDPOINT.FIND_VOTER}/${query}`
      );
      const myVoter = result.data?.data;
      setVoter(myVoter);
      setLoading(false);
      return myVoter;
    } catch (error) {
      setVoter(null);
      setLoading(false);
    }
  };

  const getVoterSlip = async (accountNumber) => {
    setLoading(true);
    setPrintStatus(SLIP_STATUS.PROCESS);
    try {
      const response = await axiosSecure.get(
        `${API_ENDPOINT.VOTER_SLIP}/${accountNumber}`,
        {
          responseType: "blob",
        }
      );

      const formData = new FormData();
      formData.append("files", response.data, "voter_slip.pdf");

      await axios.post("http://localhost:5433/print/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setVoter(null);
      setLoading(false);
      setPrintStatus(SLIP_STATUS.DONE);

      return SLIP_STATUS.DONE;
    } catch (error) {
      setVoter(null);
      setLoading(false);
      setPrintStatus(SLIP_STATUS.REJECT);
    }
  };

  const voterInfo = {
    voter,
    loading,
    getVoterByQuery,
    getVoterSlip,
    printStatus,
  };

  return voterInfo;
};

export default useVoter;
