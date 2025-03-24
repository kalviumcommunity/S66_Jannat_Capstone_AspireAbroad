const express = require('express');
const router = express.Router();
const {postVisa} = require('../controllers/UKController');

// router.get('/visa', VisaController.getVisas); 
router.post('/visa', postVisa);

module.exports = router;


