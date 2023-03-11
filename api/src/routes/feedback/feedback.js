const { Router } = require('express');
const {
  chargeDbFeedback,
  getFeedbacks,
  updateFeedback,
  getFeedbacksById,
  deleteFeedback,
  createFeedback,
  getFeedbacksByUserId,
  getFeedbacksByVdVId,
  ratingSort,
} = require('./controllers.js');

const router = Router();

router.post('/chargeDb', async (req, res) => {
  try {
    const chargeFeedbacksDb = await chargeDbFeedback();
    res.status(200).send(chargeFeedbacksDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/rating', async (req, res) => {
  const { order } = req.body;
  try {
    const result = await ratingSort(order);
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/create', async (req, res) => {
  try {
    const newFeedback = await createFeedback(req.body);
    res.status(200).send(newFeedback);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const feedbacks = await getFeedbacks();

    res.status(200).send(feedbacks);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await getFeedbacksById(id);
    res.status(200).send(feedback);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await getFeedbacksByUserId(id);
    res.status(200).send(feedback);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/vdv/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const feedback = await getFeedbacksByVdVId(id);
    res.status(200).send(feedback);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put('/update', async (req, res) => {
  const { id, comment, rating } = req.body;

  try {
    const updatedFeedback = await updateFeedback(id, comment, rating);
    res.status(200).send(updatedFeedback);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id/delete', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteFeedback(id);
    res.sendStatus(200).send(deleted);
  } catch (error) {
    res.sendStatus(400).send(error.message);
  }
});

module.exports = router;
