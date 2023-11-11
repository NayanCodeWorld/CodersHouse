require("dotenv").config();
const express = require("express");
const DBConnection = require("./dataBase");
const router = require("./routes");
const app = express();
DBConnection();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`Port listening on ${process.env.PORT}`)
);
