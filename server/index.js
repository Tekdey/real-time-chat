const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;
const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

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

app.get("/", (req, res) => {
  res.send("Hello, World 🎉");
});

app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server ✅ PORT: ${PORT}`));
