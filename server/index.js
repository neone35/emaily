const keys = require("./config/keys");
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session"); // access to cookies
const passport = require("passport"); // use cookies
const app = express();
require("./models/User")
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useMongoClient: true
  /* other options */
});

// Cookie middlewares //
// Encrypt & Set-Cookie (-> res.session) || Decrypt (-> req.session)
app.use(
  cookieSession({ // extract cookie data
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30d 24h 60m 60s 1000ms
    keys: [keys.cookieKey] // encryption key  
  })
);
app.use(passport.initialize()); // start listening to req/res
app.use(passport.session()); // use serializeUser / deserializeUser with req.session

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
