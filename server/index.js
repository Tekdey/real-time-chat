const cors = require("cors");
const mongoose = require("mongoose");

const express = require("express");

require("dotenv").config();
const PORT = process.env.PORT;

const router = require("./routes/auth");

const app = express();

/*////////////////// DATABASE ///////////////////*/
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection ✅"))
  .catch((error) => console.log(error));

/*////////////////// ROUTES ///////////////////*/

const authRoutes = require("./routes/auth.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", authRoutes);

/*////////////////// SOCKETIO  ///////////////////*/
const {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
} = require("./usersHelper.js");

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// Connection
io.on("connection", (socket) => {
  console.log("✅");
  //User join the room
  socket.on("user__join", ({ name, room }) => {
    socket.name = name;

    socket.emit("admin__general-message", { text: `Welcome ${name}` });
    socket.broadcast.emit("admin__general-message", {
      text: `${name} joined the room`,
    });

    // todo
  });
  // Messages

  socket.on("sendMessage", (message) => {
    console.log(message); // here
    socket.emit("user__message", { message, name: socket.name });
    socket.broadcast.emit("user__message", { message, name: socket.name });

    // todo
  });

  socket.on("disconnect", () => {
    console.log("❌");
    //User left the room
    socket.broadcast.emit("admin__general-message", {
      text: `${socket.name} left the room`,
    });
  });
});

app.use(router);

/*////////////////// SERVER ///////////////////*/

server.listen(PORT, () => console.log(`Server ✅ PORT: ${PORT}`));
