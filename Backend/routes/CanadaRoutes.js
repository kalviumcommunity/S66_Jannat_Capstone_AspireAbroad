const express = require('express');
const router = express.Router();
const {postVisa,getVisas} = require('../controllers/CanadaController');

// router.get('/visa', VisaController.getVisas); 
router.post('/visa', postVisa);
router.get('/visa', getVisas);

module.exports = router;


