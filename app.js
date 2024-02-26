const express = require("express");
const env = require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const mongoose = require("./config/mongoose");
const app = express();
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const ensureAuthenticated = require("./config/ensureAuthenticated");

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({ secret: "blahsomething", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/auth", authRoutes);
app.use("/api/wishlists", ensureAuthenticated, wishlistRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
