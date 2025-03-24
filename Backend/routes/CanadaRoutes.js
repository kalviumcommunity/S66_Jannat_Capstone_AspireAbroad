const express = require('express');
const router = express.Router();
const {postVisa} = require('../controllers/CanadaController');

// router.get('/visa', VisaController.getVisas); 
router.post('/visa', postVisa);

module.exports = router;


