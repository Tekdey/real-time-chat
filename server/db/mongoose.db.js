const mongoose = require("mongoose");

const connectDB = (server) => {
  const PORT = process.env.PORT || 5000;

  const DATABASE_NAME = process.env.DATABASE_NAME;
  const DATABASE_ACCESS_USER = process.env.DATABASE_ACCESS_USER;
  const DATABASE_ACCESS_PASSWORD = process.env.DATABASE_ACCESS_PASSWORD;
  const CONNECTION_URL = `mongodb+srv://${DATABASE_ACCESS_USER}:${DATABASE_ACCESS_PASSWORD}@cluster0.xut7t.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

  mongoose
    .connect(CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() =>
      server.listen(PORT, () =>
        console.log("✅ Server running on port : ", PORT)
      )
    )
    .catch((error) => console.error("❌ Server connection failed "));
};

module.exports = connectDB;
