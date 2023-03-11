const { CbuRequest, VdV } = require('../../db.js');
const { sendEmail } = require('../../services/email/index.js');
const {
  htmlVdVAprrovedCBUTemplate,
} = require('../../services/email/templates/templateFormVdV.js');

const postCbuRequest = async (cbu, idVdV) => {
  console.log(cbu, idVdV);
  try {
    const vdvWithCBU = await VdV.findAll({
      where: {
        cbu,
      },
    });
    if (!vdvWithCBU.length) {
      await CbuRequest.create({ cbu, idVdV });
    } else {
      throw new Error(
        'El CBU ya se encuentra asociado a un Punto de Reciclaje'
      );
    }
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteCbuRequest = async (id, idVdV, cbu) => {
  try {
    const request = await CbuRequest.findByPk(id);

    await request.destroy();
    const entity = await VdV.findByPk(idVdV);
    sendEmail(
      entity.mail,
      'Tu solicitud  de cambio de CBU ha sido aprobada',
      htmlVdVAprrovedCBUTemplate(entity.name, cbu)
    );
  } catch (error) {
    throw Error(error.message);
  }
};

const getCbuRequest = async () => {
  try {
    let requests = await CbuRequest.findAll();
    for (let i = 0; i < requests.length; i++) {
      let req = requests[i];
      const data = await VdV.findByPk(req.idVdV);
      req.dataValues.vdvName = data.dataValues.name;
    }
    return requests;
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  postCbuRequest,
  deleteCbuRequest,
  getCbuRequest,
};
