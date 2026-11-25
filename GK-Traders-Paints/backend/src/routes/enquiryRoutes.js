const express = require('express');
const router = express.Router();
const { createEnquiry, getAllEnquiries } = require('../controllers/enquiryController');

router.route('/').post(createEnquiry).get(getAllEnquiries);

module.exports = router;
