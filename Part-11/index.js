const express = require("express");
const path = require("path");
const userModel = require("./models/user.js");

const app = express();
const PORT = 3000;

// engine
app.set("view engine", "ejs");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  let allUsers = await userModel.find({});
  res.render("read", { allUsers });
});

app.post("/create", async (req, res) => {
  let { name, email, image } = req.body;

  let createdUser = await userModel.create({
    name,
    email,
    image,
  });

  res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
  let userUp = await userModel.findOneAndDelete({
    _id: req.params.id,
  });
  res.redirect("/read");
});

app.get("/update", async (req, res) => {
  let userUp = await userModel.findOneAndUpdate(
    { email: "24" },
    { email: "ali@gmail.com" },
    { new: true }
  );
  res.send(userUp);
});

app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});
