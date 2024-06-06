import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import socketIO from "socket.io-client";
import { API_ENDPOINT } from "../config/api";
import { SOCKET_EVENT_ENUM } from "../config/constants";
import { axiosSecure } from "../hooks/useAxiosSecure";

const getSocket = () => {
  return socketIO(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
  });
};

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [slipQueueList, setSlipQueueList] = useState([]);
  const [voterCounts, setVoterCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [voterCountsLoading, setVoterCountsLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(API_ENDPOINT.VOTER_SLIP_QUEUE_LIST)
      .then((res) => {
        if (res.data?.data) {
          setSlipQueueList(res.data?.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    axiosSecure
      .get(API_ENDPOINT.VOTER_COUNT)
      .then((res) => {
        if (res.data?.data) {
          setVoterCounts(res.data?.data);
        }
        setVoterCountsLoading(false);
      })
      .catch(() => setVoterCountsLoading(false));
  }, []);

  useEffect(() => {
    const socket = getSocket();

    socket.on(SOCKET_EVENT_ENUM.CONNECTED_EVENT, () => {
      console.log("Socket connected");
    });

    socket.on(SOCKET_EVENT_ENUM.SLIP_ISSUE_QUEUE_EVENT, (data) => {
      setSlipQueueList(data);
    });

    socket.on(SOCKET_EVENT_ENUM.VOTER_COUNT_EVENT, (data) => {
      setVoterCounts(data);
    });

    socket.on(SOCKET_EVENT_ENUM.SOCKET_ERROR_EVENT, (err) => {
      console.log("Socket error: ", err);
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, []);

  const socketInfo = {
    slipQueueList,
    voterCounts,
    loading,
    voterCountsLoading,
  };

  return (
    <SocketContext.Provider value={socketInfo}>
      {children}
    </SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node,
};

export default SocketProvider;
