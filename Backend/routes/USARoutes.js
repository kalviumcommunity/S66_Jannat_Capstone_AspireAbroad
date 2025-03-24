const express = require('express');
const router = express.Router();
const {postVisa} = require('../controllers/USAController');

// router.get('/visa', VisaController.getVisas); 
router.post('/visa', postVisa);

module.exports = router;


