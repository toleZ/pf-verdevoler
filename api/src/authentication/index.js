const passport = require('passport');
const JwtStrategy = require('./strategies/JwtStrategy');
const LocalStrategy = require('./strategies/LocalStrategy');
const GoogleStrategy = require('./strategies/GoogleStrategy');

passport.use(GoogleStrategy);
passport.use(LocalStrategy);
passport.use(JwtStrategy);
