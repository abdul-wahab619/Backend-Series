const fs = require("fs");

// fs.writeFile("first.txt", "Hi! Abdul Wahab", function (err) {
//   if (err) console.error(err);
//   else console.log("done");
// });

// fs.appendFile("first.txt", "Hey How Are You?", function (err) {
//   if (err) console.error(err);
//   else console.log("done");
// });

// fs.rename("first.txt", "firstt.txt", function (err) {
//   if (err) console.error(err);
//   else console.log("done");
// });

// fs.copyFile("firstt.txt", "./copy/copy.txt", function (err) {
//   if (err) console.error(err);
//   else console.log("done");
// });

fs.unlink("hell.txt", function (err) {
  if (err) console.error(err);
  else console.log("done");
});
