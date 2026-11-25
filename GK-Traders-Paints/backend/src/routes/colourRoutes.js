const express = require('express');
const router = express.Router();
const { getAllColours, getColourByCode } = require('../controllers/colourController');

router.get('/', getAllColours);
router.get('/:code', getColourByCode);

module.exports = router;
