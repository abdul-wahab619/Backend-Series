const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
  try {
    const { email, password, fullname } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) {
      req.flash("error", "You already have an account. Please login!");
      return res.redirect("/login");
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/register");
      }

      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          req.flash("error", err.message);
          return res.redirect("/register");
        }

        try {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          let token = generateToken(user);
          res.cookie("token", token);
          req.flash("success", "User Created Successfully");
          return res.redirect("/shop");
        } catch (err) {
          req.flash("error", err.message);
          return res.redirect("/register");
        }
      });
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/register");
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) {
      req.flash("error", "Email and password incorrect");
      return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/");
      }

      if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        return res.redirect("/shop");
      } else {
        req.flash("error", "Email and password incorrect");
        return res.redirect("/");
      }
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/");
  }
};

module.exports.logoutUser = function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};
