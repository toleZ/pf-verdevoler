const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { SECRET } = process.env;
const { findByMail, changePasswordByToken } = require('../login/controller.js');
const {
  htmlChangePasswordEmailTemplate,
} = require('../../services/email/templates/templateUsers');
const { sendEmail } = require('../../services/email');
const { sign } = require('jsonwebtoken');

const router = Router();

router.post(
  '/',
  passport.authenticate('local', {
    session: false,
  }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
      };
      const token = jwt.sign(payload, SECRET);
      res.send({
        id: user.id,
        name: user.name,
        mail: user.mail,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
  }),
  async (req, res, next) => {
    try {
      const { mail } = req.query;
      const user = await findByMail(mail);
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
);


router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(`https://ver-de-volver-pf-98gc.vercel.app/login`);   
  }
);

router.get('/password/:mail', async (req, res) => {
  const { mail } = req.params;
  try {
    const user = await findByMail(mail);
    sendEmail(
      mail,
      'Cambio de contraseña',
      htmlChangePasswordEmailTemplate(
        user.name,
        sign({ mail }, process.env.SECRET, { expiresIn: '24h' })
      )
    );

    res.status(200).send('Enviado con éxito');
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.post('/password', async (req, res) => {
  const { token, password } = req.body;
  try {
    res.status(200).send(await changePasswordByToken(token, password));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
