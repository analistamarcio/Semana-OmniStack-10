const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const routes = require("./routes");
const { setupWebSocket } = require("./websocket");
const secrets = require("./.env");

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect(
  `mongodb+srv://${secrets.DB_USER}:${secrets.DB_PASS}@cluster0-r3qqu.mongodb.net/week10?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

app.use(cors({ origin: "http://localhost:3000" }));
//app.use(cors()); // para liberar o acesso externo para todo o tipo de aplicação
app.use(express.json());
app.use(routes);

server.listen(3333);
