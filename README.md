# Order Chat Bot

Link to live site [here](https://okikiola-chat-bot.onrender.com/)

This chatbot fulfills all the below requirements

---

## Requirements

1. ChatBot interface would be like a chat interface
2. No need for authentication but we should be able to store user session based on devices
3. When a customer lands on the chatbot page, the bot should send these options to the customer:
   Select 1 to Place an order
   Select 99 to checkout order
   Select 98 to see order history
   Select 97 to see current order
   Select 0 to cancel order
4. When a customer selects “1”, the bot should return a list of items from the restaurant. The order items can have multiple options but the customer should be able to select the preferred items from the list using this same number select system and place an order.
5. When a customer selects “99” for an order, the bot should respond with “order placed” and if none the bot should respond with “No order to place”. Customer should also see an option to place a new order
6. When a customer selects “98”, the bot should be able to return all placed orders from previous order to present orders
7. When a customer selects “97”, the bot should be able to return current order and return no current order if none
8. When a customer selects “0”, the bot should cancel the order if there is.

---

## Setup

- Clone this repo to your local machine
- In the CLI run npm install to install all node modules.
- Update env with env.example file
- Run `npm run start` on the CLI or run `npm run dev` to run the app in development mode

## APIs

---

### When a client connects

- Host: 4000
- Route: /
- Method: GET

- ChatBot Response: Welcome to the chatbot --your name--
- User Response: "String"

Success

```
Chat bot: Select 1 to Place an order Select 99 to checkout order Select 98 to see order history Select 97 to see current order Select 0 to cancel order

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>1</kbd>
- ChatBot Response

Success

```
Chat bot: Here are the items you can order: 1 - Pizza 2 - Burger 3 - Pasta 4 - Salad 5 - Sandwich 6 - Fries 7 - Soda 8 - Beer 9 - Wine 10 - Coffee Please select a number to add to order

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>1</kbd>
- ChatBot Responses

Success

```
Chat bot: Pizza added to order

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>97</kbd>
- ChatBot Response

Success

```
Chat bot: Current order: Burger - 2 Pizza - 1 Pasta - 1
```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>99</kbd>
- ChatBot Response

Success

```
Chat bot: order placed

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>98</kbd>
- ChatBot Responses

Success

```
Chat bot: Order 1: Burger - 2 Pizza - 1 Pasta - 1

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>0</kbd>
- ChatBot Responses

Success

```
Chat bot: Order cancelled Select 1 to Place an order Select 99 to checkout order Select 98 to see order history Select 97 to see current order Select 0 to cancel order

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>98</kbd>
- ChatBot Responses

Success

```
Chat bot: No order history

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>97</kbd>
- ChatBot Responses

Success

```
Chat bot: No current order Select 1 to Place an order Select 99 to checkout order Select 98 to see order history Select 97 to see current order Select 0 to cancel order

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>0</kbd>
- ChatBot Responses

Success

```
Chat bot: No order to cancel Select 1 to Place an order Select 99 to checkout order Select 98 to see order history Select 97 to see current order Select 0 to cancel order
```
