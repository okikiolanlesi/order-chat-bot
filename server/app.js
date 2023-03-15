const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("chat message", (data) => {
    io.emit("chat message", { ...data, name: "Chat bot" });
  });

  socket.on("welcome", (data) => {
    socket.emit("chat message", `Welcome ${data.name}`);
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
