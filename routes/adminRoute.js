const express = require("express");
const router = express.Router();
const { notLoggedIn, loggedIn, notAdmin } = require("../middleware");
const User = require("../model/user");
const passport = require("passport");

router.get("/profile", notLoggedIn, notAdmin, async (req, res) => {
  console.log(req.user);
  const users = await User.find();
  console.log(users);
  res.render("admin/profile", {
    title: "Admin Profile || Barangay Mag-Asawang Sapa",
    users,
  });
});

router.post(
  "/login",
  (req, res, next) => {
    req.body.username = req.body.username.toLowerCase();
    next();
  },
  passport.authenticate("admin", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  async (req, res) => {
    req.flash("success", "Welcome Back!");
    res.redirect("/admin/profile");
  }
);

module.exports = router;
