//to use sockets we make a new context
import { createContext, useContext, useMemo } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};


//this provider gives whole app accesss to socket
export const SocketProvider = (props) => {
  const socket = useMemo(() => io("localhost:9000"), []);
  //socket server
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
