const notLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please login first.");
    return res.redirect("/login");
  }
  next();
};
const loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.flash("error", "You are already logged in.");
    if (req.user.admin) {
      return res.redirect("/admin/profile");
    } else {
      return res.redirect("/user/profile");
    }
  }
  next();
};
const notAdmin = (req, res, next) => {
  if (!req.user.admin) {
    req.flash("error", "You are not an admin!");
    return res.redirect("/user/profile");
  }
  next();
};
const notUser = (req, res, next) => {
  if (req.user.admin) {
    req.flash("error", "You are not an user!");
    return res.redirect("/admin/profile");
  }
  next();
};

module.exports = { notLoggedIn, loggedIn, notAdmin, notUser };
