const express = require("express");
const router = express.Router();
const User = require("../models/User.model.js");
const CustomError = require("../utils/customError.js");
const asyncWrapper = require("../utils/asyncWrapper.js");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../utils/middleware.auth.js");
const {
  signUpForm,
  signUp,
  loginForm,
  login,
  logout,
} = require("../controllers/user.controller.js");


router.route('/signup')
.get( signUpForm)
.post(asyncWrapper(signUp));

router.get("/profile", isLoggedIn ,(req, res) => {
  if (req.user) {
    res.render("Dashboard", { user: req.user });
  }
});

router.route('/login')
.get( loginForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  login
);

router.get("/logout", isLoggedIn, logout);

module.exports = router;
