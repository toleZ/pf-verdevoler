const { Router } = require('express');
const { postComments, allComents } = require('./controller');
const router = Router();

router.post('/', async (req, res) => {
  const { name, mail, description } = req.body;
  try {
    const emailSent = await postComments(name, mail, description);

    res.status(200).send(emailSent);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const allComentaries = await allComents();

    res.status(200).send(allComentaries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
