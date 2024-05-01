const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 5000;

app.use(cookieParser());
app.get("/", (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("abdul", salt, function (err, hash) {
      console.log(hash);
    });
  });
});

app.get("/compare", (req, res) => {
  bcrypt.compare(
    "abdul",
    "$2a$10$yRuGUkvBXbMe1aHgQinrW.2L2YaThWY1ewmKhoJqhRx6iQwUTH2uq",
    (err, result) => {
      console.log(result);
    }
  );
});

app.get("/token", (req, res) => {
  let token = jwt.sign({ email: "abdul@gmail.com" }, "secret");
  res.cookie("token", token);
  res.send("token done");
});

app.get("/tread", (req, res) => {
  let data = jwt.verify(req.cookies.token, "secret");
  console.log("data", data);
  res.send("token read done");
});

app.listen(PORT, () => {
  console.log(`Server is Running at: ${PORT}`);
});
