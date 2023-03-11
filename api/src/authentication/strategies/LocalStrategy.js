const { Strategy } = require('passport-local');
const { findByMail } = require('../../routes/login/controller');
const bcrypt = require('bcrypt');

const LocalStrategy = new Strategy(
  {
    usernameField: 'mail',
    passwordField: 'password',
  },
  async (mail, password, done) => {
    try {
      const user = await findByMail(mail);
      if (!user) {
        done(null, false, {
          message: 'Correo electrónico incorrecto.',
        });
      }
      const checkpass = bcrypt.compareSync(password, user.password);

      if (checkpass == false) {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
      return done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

module.exports = LocalStrategy;
