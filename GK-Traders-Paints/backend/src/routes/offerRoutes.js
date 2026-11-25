const express = require('express');
const router = express.Router();
const { getAllOffers, getOfferById } = require('../controllers/offerController');

router.get('/', getAllOffers);
router.get('/:id', getOfferById);

module.exports = router;
