require("dotenv").config();
const express = require("express");
const DBConnection = require("./dataBase");
const router = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
DBConnection();

app.use("/storage", express.static("storage"));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(express.json({ limit: "8mb" }));
app.use(router);

app.listen(process.env.PORT, () =>
  console.log(`Port listening on ${process.env.PORT}`)
);
