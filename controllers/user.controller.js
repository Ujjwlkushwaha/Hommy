const { model } = require("mongoose");
let User = require("../models/User.model");

module.exports.signUpForm = function (req, res) {
  res.render("./users/signup");
};

module.exports.signUp = async (req, res, next) => {
  try {
    let { email, username, password } = req.body;

    if (!email || !username || !password) {
      req.flash("error", "All fields are required");
      throw new CustomError(400, "All fields are required");
    }

    let user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
        return;
      }
      req.flash("success", "Welcome to the platform");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

module.exports.loginForm = function (req, res) {
  res.render("./users/login");
};

module.exports.login = function (req, res) {
  req.flash("success", "Welcome back janeman😘");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = function (req, res) {
  req.logout((err) => {
    if (err) {
      req.flash("error", err.message);
      res.redirect("/listings");
      return;
    }
    console.log("Logged out successfully");
    req.flash("success", "Logged out successfully");
    res.redirect("/listings");
  });
};
