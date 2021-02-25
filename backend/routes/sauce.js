//  express
const express = require('express');
// On crée le router via express
const router = express.Router();

// On récupère tous les middlewares et controllers pour nos routes
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const getOldImage = require('../middleware/getOldImage')
const sauceCtrl = require('../controllers/sauce');


router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, getOldImage.deleteOldImage, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', auth, sauceCtrl.likeSystem)

module.exports = router