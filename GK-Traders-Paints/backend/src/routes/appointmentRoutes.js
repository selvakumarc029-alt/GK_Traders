const express = require('express');
const router = express.Router();
const {
  createAppointment,
  getAllAppointments,
} = require('../controllers/appointmentController');

router.route('/').post(createAppointment).get(getAllAppointments);

module.exports = router;
