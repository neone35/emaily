const passport = require("passport");
const keys = require("../config/keys.js");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get(
    "/auth/google/callback", 
    passport.authenticate("google"),
    (req, res) => {
      // use :3000 on dev || null on prod
      res.redirect(keys.host || null + '/surveys');
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout(); //passport erases req.session
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    // res.send(req.session.passport.user);
    res.send(req.user);
  });
};
