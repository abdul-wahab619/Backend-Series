// Fundamental of Javascript

// Foreach map filter find indexOf
var arr = [1, 3, 4, 5, 99];
arr.forEach(function (val) {
  console.log(val + "foreach call");
});

var res = arr.map(function (val) {
  return val + 1;
});
console.log(res);

var ans = arr.filter(function (val) {
  if (val > 4) return true;
});
console.log(ans);

var resf = arr.find(function (val) {
  if (val === 4) return val;
});
console.log(resf);

arr.indexOf(99);

// Arrays and Objects
var obj = {
  name: "Abdul Wahab",
  age: 22,
};

Object.freeze(obj);
obj.age = 25;
console.log(obj.age);

// Function return
function abdul() {
  return "Abdul";
}

function wahab() {
  return "Wahab";
}

console.log(abdul() + " " + wahab());

// Async Js Coding
async function abc() {
  var john = await fetch(`https://randomuser.me/api/`);
  var result = await john.json();
  return result;
}

abc().then((result) => {
  console.log(result);
});
