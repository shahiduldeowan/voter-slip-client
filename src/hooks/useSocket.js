import { useContext } from "react";
import { SocketContext } from "../providers/SocketProvider";

const useSocket = () => {
  const socketProvider = useContext(SocketContext);
  return socketProvider;
};

export default useSocket;
