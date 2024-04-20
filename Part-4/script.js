const express = require("express");
const app = express();

// middleware
app.use(function (req, res, next) {
  console.log("middleware called");
  next();
});

app.get("/", function (req, res) {
  res.send("Hi! Abdul Wahab");
});

app.get("/profile", function (req, res, next) {
  //   res.send("Abdul Wahab that's your Profile!");
  return next(new Error("Something we don't know"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});
let PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
