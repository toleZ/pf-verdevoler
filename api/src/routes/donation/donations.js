const { Router } = require('express');
const { mercadopago } = require('../mercadoPago.js');

const {
  chargeDbDonation,
  getByUserId,
  getByVdVId,
  updateDonations,
  createDonation,
  getAll,
  getDonationsById,
  setMp,
  deleteDonation,
} = require('./controllers.js');

const router = Router();

router.delete('/:id', async (req, res) => {
  console.log('HOLAAA');
  const { id } = req.params;
  console.log(id);
  try {
    await deleteDonation(id);
    res.status(200).send('Eliminada donacion' + ' ' + +id);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/chargeDb', async (req, res) => {
  try {
    const chargeDonationsDb = await chargeDbDonation();
    res.status(200).send(chargeDonationsDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const newDonation = await setMp(body);

    mercadopago.preferences
      .create(newDonation)
      .then((response) => res.status(200).send(response));
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post('/confirmationDonation', (req, res) => {
  const { body, query } = req;
  mercadopago.merchant_orders
    .findById(body.resource?.slice(45))
    .then(async (res) => {
      const amount = res.body.payments[0].transaction_amount;
      const UserId = res.body.items[0].id;
      const VdVId = res.body.items[0].category_id;
      const mpId = res.body.id.toString();
      await createDonation(amount, UserId, VdVId, mpId);
    });
  res.send();
});

router.get('/', async (req, res) => {
  try {
    const allDonations = await getAll();

    return res.status(200).send(allDonations);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updateDon = await updateDonations(id);
    if (updateDon)
      res.status(200).send(`Donacion ID ${id}, status actualizado `);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const findByUser = await getByUserId(id);
    return res.status(200).json(findByUser);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get('/vdv/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const findByVdV = await getByVdVId(id);
    return res.status(200).json(findByVdV);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const donation = await getDonationsById(id);
    res.status(200).send(donation);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
