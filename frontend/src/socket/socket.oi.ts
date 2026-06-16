/* eslint-disable */
import { io, Socket } from "socket.io-client";
import { getToken } from "../services/auth.service";
import { resolveSocketUrl } from "../helpers/socket-url";

export let socketIo: Socket | null = null;

export const getSocketIo = (): Socket | null => {
  return socketIo;
};

export const connectSocket = (): Socket | null => {
  if (socketIo && socketIo.connected) {
    return socketIo;
  }

  const socketUrl = resolveSocketUrl();
  if (!socketUrl) {
    console.warn("[Story Spark] Socket.IO URL not configured. Real-time notifications disabled.");
    return null;
  }

  const token = getToken();
  if (!token) {
    console.warn("[Story Spark] User not authenticated. Cannot connect to Socket.IO.");
    return null;
  }

  socketIo = io(socketUrl, {
    transports: ["websocket", "polling"],
    autoConnect: false,
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
    auth: { token },
    withCredentials: true,
  });

  socketIo.on("connect", () => {
    console.log("[Story Spark] Socket.IO connected");
  });

  socketIo.on("disconnect", () => {
    console.log("[Story Spark] Socket.IO disconnected");
  });

  socketIo.on("connect_error", (error: any) => {
    console.warn("[Story Spark] Socket.IO connection error:", error);
  });

  socketIo.connect();
  return socketIo;
};

export const disconnectSocket = (): void => {
  if (socketIo && socketIo.connected) {
    socketIo.disconnect();
    socketIo = null;
  }
};