import pkg from "passport-jwt";
import User from "../Models/UserModal.js";

const JwtStrategy = pkg.Strategy,
  ExtractJwt = pkg.ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret key";
export default (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      console.log(jwt_payload);
      User.findOne({ _id: jwt_payload?.id }, function (err, user) {
        console.log(user);
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      });
    })
  );
};
