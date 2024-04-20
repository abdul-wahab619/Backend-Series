const http = require("http");

const server = http.createServer(function (req, res) {
  res.end("Hi! Abdul Wahab");
});

server.listen(3000);
