const passport = require("passport");
const passportJWT = require("passport-jwt");
const bcrypt = require("bcrypt");
const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;
const { getUserByEmail } = require("../services/users-service");

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(function (email, done) {
  done(null, email);
});
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async function (email, password, cb) {
      return getUserByEmail(email)
        .then((rows) => {
          if (rows.length === 0) {
            return cb(null, false, { message: "User was not found" });
          }
          const validPassword = bcrypt.compareSync(password, rows[0].password);
          if (!validPassword) {
            return cb(null, false, { message: "Incorrect password" });
          }
          return cb(null, rows[0], {
            message: "Logged In Successfully",
          });
        })
        .catch((err) => cb(err, false, { message: "Error" }));
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    function (jwtPayload, cb) {
      const expirationDate = new Date(jwtPayload.exp * 1000);
      if (expirationDate < new Date()) {
        return cb(null, false);
      }
      cb(null, jwtPayload.user);
    }
  )
);
