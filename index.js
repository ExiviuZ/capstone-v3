// Application Dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");
const port = 3235;
const sessionOptions = {
  secret: "notasecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  httpOnly: true,
};

// My Modules
const User = require("./model/user");
const Admin = require("./model/admin");
const Survey = require("./model/survey");
const { notLoggedIn, loggedIn } = require("./middleware");

// Router
const logRegRoute = require("./routes/logRegRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/barangayDB")
  .then((res) => {
    console.log("~~Success connecting to database~~");
  })
  .catch((err) => {
    console.log("Connection Error");
  });

// Setting Middlewares and Templating
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// Authentication For General User and Administrator
passport.use("user", new LocalStrategy(User.authenticate()));
passport.use("admin", new LocalStrategy(Admin.authenticate()));

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  if (user != null) {
    done(null, user);
  }
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", loggedIn, async (req, res) => {
  const users = await User.find();
  res.render("home", { users, title: "Barangay Mag-Asawang Sapa" });
});

app.post("/yawa", async (req, res) => {
  console.log(req.body);
  res.send("check terminal");
});

app.use("/", logRegRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.use((err, req, res, next) => {
  console.log("*************************");
  console.log("*************************");
  console.log(err);
  console.log("*************************");
  console.log("*************************");
  res.send(err.message);
});

app.all("*", (req, res) => {
  res.status(404).send("Page not Found");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
