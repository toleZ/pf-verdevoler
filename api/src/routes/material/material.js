const { Router } = require('express');
const {
  createMaterial,
  getAllMaterials,
  deleteMaterial,
  crearMaterialFinal,
  chargeDbMaterial,
} = require('./controllers.js');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const material = await crearMaterialFinal(req.body);
    res.status(200).send(material);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const allMaterials = await getAllMaterials();
    res.status(200).send(allMaterials);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete('/', async (req, res) => {
  const { name } = req.body;
  try {
    const material = await deleteMaterial(name);
    material > 0
      ? res.status(200).send(` Material ${name} eliminado`)
      : res.status(404).send('No se encuentra material');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post('/chargeDb', async (req, res) => {
  try {
    const chargeMaterialDb = await chargeDbMaterial();
    res.status(200).send(chargeMaterialDb);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
