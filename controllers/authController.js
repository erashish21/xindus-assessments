const passport = require("../config/passport-local-strategy");
const User = require("../models/User"); 

function login(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!user) {
      return res.status(401).json({ error: "Incorrect username or password" });
    }

    // Log in the user
    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }

      // Generate and return an authentication token
      const token = generateAuthToken(user);
      return res.status(200).json({ token });
    });
  })(req, res, next);
}

async function signup(req, res) {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    // Log in the user and generate a token
    req.login(newUser, { session: false }, (err) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const token = generateAuthToken(newUser);
      return res.status(201).json({ token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function generateAuthToken(user) {
 
  return "";
}

module.exports = { login, signup };
