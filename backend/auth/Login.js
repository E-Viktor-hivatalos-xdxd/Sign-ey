const passport = require("passport");
const { User } = require("../schema");
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//TODO: fix for new DB
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) return done(undefined);

      const passwordMatch = user.validPassword(password);

      if (passwordMatch != true) {
        return done(undefined);
      }

      return done(null, user);
    }
  )
);
