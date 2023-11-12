require("dotenv").config();
const express = require("express");
const DBConnection = require("./dataBase");
const router = require("./routes");
const cors = require("cors");

const app = express();
DBConnection();

app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`Port listening on ${process.env.PORT}`)
);
