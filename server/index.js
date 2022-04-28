const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const connectDB = require("./db/mongoose.db");
const socketIO = require("./utils/socket.io");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

require("dotenv").config();

const route = require("./routes/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", route.auth);
app.use("/room", route.room);
app.use("/account", route.account);
app.use("/token", route.token);

socketIO(io);
connectDB(server);
