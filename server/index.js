const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

const authRoutes = require("./routes/auth.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/auth", authRoutes);

/*////////////////// DATABASE ///////////////////*/
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection ✅"))
  .catch((error) => console.log(error));

/*////////////////// ROUTES ///////////////////*/

app.get("/", (req, res) => {
  res.send("Hello, World 🎉");
});

app.listen(PORT, () => console.log(`Server ✅ PORT: ${PORT}`));
