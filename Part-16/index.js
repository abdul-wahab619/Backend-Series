const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const userModel = require("./models/userModel.js");
const postModel = require("./models/postModel.js");

const app = express();
const PORT = 5000;

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/profile", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.render("login");
});

app.post("/register", async (req, res) => {
  let { name, username, email, password, age } = req.body;
  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("User Already registered.");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        name,
        username,
        email,
        password: hash,
        age,
      });
      let token = jwt.sign({ email, userid: user._id }, "abdul");
      res.cookie("token", token);
      res.send(user);
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.send("Something went wrong...");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email, userid: user._id }, "abdul");
      res.cookie("token", token);
      res.status(200).send("you can login");
    } else res.redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.send("You must be loggedin.");
  else {
    let data = jwt.verify(req.cookies.token, "abdul");
    req.user = data;
  }
  next();
}

app.listen(PORT, () => {
  console.log(`Server is Running at: ${PORT}`);
});
