const { Router } = require('express');
const router = Router();
const {
  postCbuRequest,
  deleteCbuRequest,
  getCbuRequest,
} = require('./controllers');

router.post('/', async (req, res) => {
  const { cbu, idVdV } = req.body;
  // console.log(cbu, idVdV);
  try {
    await postCbuRequest(cbu, idVdV);
    res.status(200).send('Solicitud guardada');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { idVdV, cbu } = req.query;
  try {
    await deleteCbuRequest(id, idVdV, cbu);
    res.status(200).send('Solicitud borrada');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const requests = await getCbuRequest();
    res.status(200).send(requests);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
