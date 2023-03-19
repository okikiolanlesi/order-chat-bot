const express = require("express");
const http = require("http");
const app = express();
// require('dotenv').config()
// const mongoose = require("mongoose");
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
const { botMessage, userMessage, responseExec } = require("./helper");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
  },
  // store: new MongoDBStore({
  //   uri: process.env.MONGO_URI || "mongodb://localhost:27017/chatbot",
  //   collection: "sessions",
  // }),
});

io.engine.use(sessionMiddleware);

io.on("connection", (socket) => {
  const req = socket.request;

  const stateStructure = {
    name: "",
    orders: [],
    currentOrder: {},
    placing: false,
  };
  req.session.state = stateStructure;

  const state = req.session.state;
  console.log(req.session);

  console.log(req.session.state);
  socket.on("user message", (data) => {
    userMessage(data, socket);
    let message = "";

    responseExec(data, message, state, socket);
  });
  const controlsMessage =
    "Select 1 to Place an order\nSelect 99 to checkout order\nSelect 98 to see order history\nSelect 97 to see current order\nSelect 0 to cancel order\n";
  socket.on("welcome", (data) => {
    state.name = data.name;
    botMessage("Welcome to the chatbot " + data.name, socket);
    botMessage(controlsMessage, socket);
  });
});
console.log("here")
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    console.log("Connected to database");
    server.listen(3000, () => {
      console.log("listening on *:3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
