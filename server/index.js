const cors = require("cors");
const mongoose = require("mongoose");

const express = require("express");

require("dotenv").config();
const PORT = process.env.PORT;

const routerAuth = require("./routes/auth");
const routerRoom = require("./routes/room");
const routerAccount = require("./routes/account");

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
const roomRoutes = require("./routes/room.js");
const accountRoutes = require("./routes/account.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", authRoutes);
app.use("/room", roomRoutes);
app.use("/account", accountRoutes);

app.use(routerAuth);
app.use(routerRoom);
app.use(routerAccount);

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
  socket.on("user__join", ({ name, room }, callback) => {
    socket.name = name;
    const { error, user } = addUser({
      id: socket.id,
      name,
      room,
    });
    if (error) return callback(error);
    socket.join(user.room);

    // Admin messages
    socket.emit("admin__general-message", {
      text: `Welcome ${user.name}`,
      users: "admin",
    });
    socket.to(user.room).emit("admin__general-message", {
      text: `${user.name} joined the room`,
      users: "admin",
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
  socket.on("sendMessage", (text) => {
    const currentLocalTime = new Date();
    const user = getUser(socket.id);
    socket.emit("user__message", {
      text,
      users: user.name,
      date: currentLocalTime.toLocaleTimeString(),
    });
    socket.to(user.room).emit("user__message", {
      text,
      users: user.name,
      date: currentLocalTime.toLocaleTimeString(),
    });
  });

  socket.on("disconnect", (reason) => {
    console.log("❌");
    const user = removeUser(socket.id);
    // Error callback for user
    if (reason === "transport close") {
      socket.to(user.room).emit("transport__close-error", {
        error: `${user.name} had a connection issue`,
      });
    }
    // User left the room

    if (user) {
      // Msg left
      socket.to(user.room).emit("admin__general-message", {
        text: `${user.name} left the room`,
        users: "admin",
      });
      socket.emit("admin__general-message", {
        text: `${user.name} left the room`,
        users: "admin",
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

/*////////////////// SERVER ///////////////////*/

server.listen(PORT, () => console.log(`Server ✅ PORT: ${PORT}`));
