const { User, Role, VdV } = require('../../db.js');
const bcrypt = require('bcrypt');
const { verify } = require('jsonwebtoken');
const {
  updatePassword,
} = require('../../services/email/templates/templateUsers');

const findUser = async (mail) => {
  if (!mail) throw Error('Debes ingresar un mail');

  const usuario = await User.findOne({
    where: { mail },
    include: [
      {
        model: Role,
        attributes: ['name'],
      },
    ],
  });

  if (!usuario) throw Error('No se encontraron usuarios con ese mail');

  return usuario;
};

const findByMail = async (mail) => {
  if (!mail) throw Error('Debes ingresar un mail');

  let loginmail;

  const userMail = await User.findOne({
    where: { mail },
  });

  const vdvMail = await VdV.findOne({
    where: { mail },
  });

  if (!userMail && !vdvMail)
    throw Error(`No se encontraron usuarios o entidades con el mail ${mail}`);
  if (!userMail) {
    loginmail = vdvMail;
  }
  if (!vdvMail) {
    loginmail = userMail;
  }

  return loginmail;
};

const changePasswordByToken = async (token, password) => {
  const { mail } = verify(token, process.env.SECRET);

  const userUpdate = await findByMail(mail);

  if (!userUpdate) throw Error(`El usuario con mail ${mail} no fue encontrado`);

  const salt = 10;
  userUpdate.password = bcrypt.hashSync(password, salt);

  await userUpdate.save();

  return updatePassword;
};

module.exports = {
  findUser,
  findByMail,
  changePasswordByToken,
};
