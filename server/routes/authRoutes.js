const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/", (req, res) => {
    res.send("root test");
  });

  app.get("/api/logout", (req, res) => {
    req.logout(); //passport erases req.session
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    // res.send(req.session.passport.user);
    res.send(req.user);
  });
};
