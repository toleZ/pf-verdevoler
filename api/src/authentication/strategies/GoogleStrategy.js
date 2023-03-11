const Strategy = require('passport-google-oauth20');
const { User } = require('../../db');
const bcrypt = require('bcrypt');

const GoogleStrategy = new Strategy(
  {
    clientID:
      '1062951211306-8rjsrlpirtmqns7k2lejkrhvm1sthvm2.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/login/google/callback',
    prompt: 'select_account',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOne({ where: { googleId: profile.id } });
      if (user) {
        done(null, user);
      } else {
        const salt = 10;
        const hash = bcrypt.hashSync('GOCSPX', salt);

        const newUser = await User.create({
          googleId: profile.id,
          name: profile.name.givenName,
          last_name: profile.name.familyName,
          mail: profile.emails[0].value,
          image: profile.photos[0].value,
          password: hash,
        });
        done(null, newUser);
      }
    } catch (error) {
      done(error);
    }
  }
);

module.exports = GoogleStrategy;
