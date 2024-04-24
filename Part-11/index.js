const express = require("express");
const userModel = require("./userModel.js");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hi! Abdul Wahab!");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    name: "Abdul Wahab",
    email: "abdul@gamil.com",
    age: 22,
  });
  res.send(user);
});
app.get("/read", async (req, res) => {
  let userUp = await userModel.find();
  res.send(userUp);
});
app.get("/update", async (req, res) => {
  let userUp = await userModel.findOneAndUpdate(
    { email: "24" },
    { email: "ali@gmail.com" },
    { new: true }
  );
  res.send(userUp);
});
app.get("/delete", async (req, res) => {
  let userUp = await userModel.findOneAndDelete({
    _id: "662955a2f620d51e2cd8bf7c",
  });
  res.send(userUp);
});

app.listen(PORT, () => {
  console.log(`Server is running at: ${PORT}`);
});
