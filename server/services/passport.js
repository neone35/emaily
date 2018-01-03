const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users"); // model class (represents Collection)

// [User -> res.session.passport.user] -> encode and Set-Cookie
passport.serializeUser((user, done) => {
  done(null, user.id); // mongo generated _id, universal for all OAuth's
});

// Decode -> [req.session.passport.user -> User] -> req.user 
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log("access token:", accessToken + "\n");
      // console.log("refresh token:", refreshToken + "\n");
      // console.log("profile-id:", profile.id);
      // console.log("done:", done);
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          // model instance of found user
          done(null, existingUser); // no error!, here is user
        } else {
          new User({ googleID: profile.id }) // model instance (represents Document)
            .save() // save it to MongoDB (create Document)
            .then(user => done(null, user)); // make sure user created (with promise)
        }
      });
    }
  )
);
