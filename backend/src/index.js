const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const secrets = require("./.env");

const app = express();

mongoose.connect(
  `mongodb+srv://${secrets.DB_USER}:${secrets.DB_PASS}@cluster0-r3qqu.mongodb.net/week10?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
);

app.use(express.json());
app.use(routes);

app.listen(3333);
