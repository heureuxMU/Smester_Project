const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const usersRoute = require("./routes/usersRoute");


const cors = require("cors");
const port =  4000;

mongoose.connect(
  "mongodb+srv://ali:common12@fyp.9o3c7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",  () => {
    console.log("Database connected...");
  }
);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use("/users", usersRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  // res.send("Backend!");
});

app.listen(port, () => {
  console.log("Backend is running....");
});
