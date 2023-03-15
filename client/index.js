import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

// send a message to the server
socket.emit("client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("message", (...args) => {
  // ...
});
