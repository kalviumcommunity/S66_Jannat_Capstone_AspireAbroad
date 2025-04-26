const express = require('express');
const router = express.Router();
const {postVisa,getVisas} = require('../controllers/USAController');


router.post('/visa', postVisa);
router.get('/visa', getVisas);
module.exports = router;


