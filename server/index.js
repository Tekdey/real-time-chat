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
    const { user } = addUser({
      id: socket.id,
      name,
      room,
    });

    socket.join(user.room);

    // Admin messages
    socket.emit("admin__general-message", { text: `Welcome ${user.name}` });
    socket.to(user.room).emit("admin__general-message", {
      text: `${user.name} joined the room`,
    });

    // Room Data

    socket.to(user.room).emit("room__data", {
      room: user.room,
      users: getUserInRoom(user.room),
    });
    socket.emit("room__data", {
      room: user.room,
      users: getUserInRoom(user.room),
    });
  });
  // Messages

  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    socket.emit("user__message", { message, name: user.name });
    socket.to(user.room).emit("user__message", { message, name: user.name });
  });

  socket.on("disconnect", () => {
    console.log("❌");
    //User left the room

    const user = removeUser(socket.id);

    if (user) {
      // Msg left
      socket.to(user.room).emit("admin__general-message", {
        text: `${user.name} left the room`,
      });
      socket.emit("admin__general-message", {
        text: `${user.name} left the room`,
      });
      // User in room
      socket.emit("room__data", {
        room: user.room,
        users: getUserInRoom(user.room),
      });
      socket.to(user.room).emit("room__data", {
        room: user.room,
        users: getUserInRoom(user.room),
      });
    }
  });
});

app.use(router);

/*////////////////// SERVER ///////////////////*/

server.listen(PORT, () => console.log(`Server ✅ PORT: ${PORT}`));
