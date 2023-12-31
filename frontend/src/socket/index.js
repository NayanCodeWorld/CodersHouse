import { io } from "socket.io-client";

export const socketInit = () => {
  const options = {
    "force new connection": true,
    reconnectionAttempt: "Infinite",
    timeout: 10000,
    transport: ["websocket"],
  };

  return io("http://localhost:5500", options);
};
