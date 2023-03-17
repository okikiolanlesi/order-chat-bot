const express = require("express");
const http = require("http");
const app = express();
const session = require("express-session");
const { botMessage, userMessage, items } = require("./helper");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const sessionMiddleware = session({
  secret: "aduebciaheybfiudbnsnujdusnhofh",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
});

io.engine.use(sessionMiddleware);
const sessions = [];

io.on("connection", (socket) => {
  const req = socket.request;

  const state = {
    name: "",
    orders: [],
    currentOrder: {},
    placing: false,
  };

  socket.on("user message", (data) => {
    userMessage(data, socket);
    let message = "";

    if (data.message === "1" && !state.placing) {
      message = "Here are the items you can order:\n";
      state.placing = true;
      for (let key in items) {
        message += `${key} - ${items[key]}\n`;
      }
      message += "Please select a number to add to order";
    } else if (data.message === "99") {
      if (state.currentOrder.length > 0) {
        message = "order placed";
      } else {
        message = "No order to place\n";
        message +=
          "Select 1 to Place an order\nSelect 99 to checkout order\nSelect 98 to see order history\nSelect 97 to see current order\nSelect 0 to cancel order\n";
      }
    } else if (data.message === "98") {
      if (state.orders.length > 0) {
        for (let i = 0; i < state.orders.length; i++) {
          message += `Order ${i + 1}:\n`;
          for (let key in state.orders[i]) {
            message += `${key} - ${state.orders[i][key]}\n`;
          }
        }
      } else {
        message = "No order history";
      }
    } else if (data.message === "97") {
      if (Object.keys(state.currentOrder).length > 0) {
        message = "Current order:\n";
        for (let key in state.currentOrder) {
          message += `${key} - ${state.currentOrder[key]}\n`;
        }
      } else {
        message = "No current order\n";
        message +=
          "Select 1 to Place an order\nSelect 99 to checkout order\nSelect 98 to see order history\nSelect 97 to see current order\nSelect 0 to cancel order\n";
      }
    } else if (data.message === "0") {
      if (Object.keys(state.currentOrder).length === 0) {
        message = "No order to cancel\n";
      } else {
        state.currentOrder = {};

        message = "Order cancelled\n";
      }
      message +=
        "Select 1 to Place an order\nSelect 99 to checkout order\nSelect 98 to see order history\nSelect 97 to see current order\nSelect 0 to cancel order\n";
    } else if (state.placing) {
      if (data.message in items) {
        state.currentOrder[data.message] = items[data.message];
        message = "Item added to order\n";
      } else {
        message = "Invalid input\n";
        message +=
          "Select 1 to Place an order\nSelect 99 to checkout order\nSelect 98 to see order history\nSelect 97 to see current order\nSelect 0 to cancel order\n";
      }
    } else {
      message = "Invalid input\n";
      message +=
        "Select 1 to Place an order\nSelect 99 to checkout order\nSelect 98 to see order history\nSelect 97 to see current order\nSelect 0 to cancel order\n";
    }

    if (message.length > 0) {
      botMessage(message, socket);
    }
  });

  socket.on("order", (data) => {
    if (data.message === "99") {
      if (order.length > 0) {
        message = "Order placed";
      } else {
        message = "No order to place";
      }
    } else if (data.message === "98") {
      message = orders;
    } else if (data.message === "97") {
      message = orders[length - 1];
    } else if (data.message === "0") {
      message = "Select 0 to cancel order";
    } else {
      message = "Invalid input";
    }
    botMessage(message, socket);
  });

  socket.on("welcome", (data) => {
    botMessage("Welcome to the chatbot " + data.name, socket);
    botMessage(
      "Select 1 to Place an order\nSelect 99 to checkout order\nSelect 98 to see order history\nSelect 97 to see current order\nSelect 0 to cancel order\n",
      socket
    );
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
