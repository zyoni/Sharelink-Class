const passport = require("passport");
const passportJWT = require("passport-jwt");
const config = require("./config");

const ExtractJwt = passportJWT.ExtractJwt;

module.exports = (knex) => {
  const strategy = new passportJWT.Strategy(
    {
      secretOrKey: config.jwtSecret,
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
    },
    async (req, payload, done) => {
      if (!payload.id) {
        return done(new Error("Invalid payload"), null);
      }
      const user = await knex("users").where({
        id: payload.id,
      });
      if (!user[0]) {
        return done(new Error("User not found"), null);
      }
      const id = req.body.id || req.query.id;
      if (user[0].id !== Number(id)) {
        return done(
          new Error(
            "Access to computer with criminal or dishonest intent"
          ),
          null
        );
      }
      return done(null, { id: user[0].id });
    }
  );

  passport.use(strategy);

  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate(
        "jwt",
        config.jwtSession
      );
    },
  };
};
