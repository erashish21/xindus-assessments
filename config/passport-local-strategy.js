const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/User"); // Adjust the path based on your actual file structure

passport.use(
  new LocalStrategy(
    { usernameField: "username", passwordField: "password" },
    async (username, password, done) => {
      try {
        // Replace this with your actual user authentication logic
        const user = await User.findOne({ username });

        if (!user || !user.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect username or password",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
