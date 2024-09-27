const express = require('express');
const router = express.Router();
const artigoController = require('../controllers/artigoController');

router.get('/artigos', artigoController.getArtigos);
router.post('/artigos', artigoController.createArtigo);
router.put('/artigos/:id', artigoController.updateArtigo);
router.delete('/artigos/:id', artigoController.deleteArtigo);
router.delete('/artigos', artigoController.deleteAllArtigos);

module.exports = router;