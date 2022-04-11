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

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      name,
      room,
    });
    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room} `,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined` });

    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("❌");
  });
});

app.use(router);

/*////////////////// SERVER ///////////////////*/

server.listen(PORT, () => console.log(`Server ✅ PORT: ${PORT}`));
