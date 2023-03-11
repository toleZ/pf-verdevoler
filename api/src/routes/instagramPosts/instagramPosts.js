const { Router } = require('express');
const router = Router();
const { postInsta, updateInsta, getAllPosts } = require('./controllers');

router.post('/', async (req, res) => {
  const { url } = req.body;
  try {
    await postInsta(url);
    res.status(200).send('Cargado');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put('/', async (req, res) => {
  const { url, id } = req.body;
  try {
    await updateInsta({ url, id });
    res.status(200).send('Actualizado');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).send(posts);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
