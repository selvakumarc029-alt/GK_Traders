const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res, next) => {
  try {
    const {
      name,
      email,
      phone,
      preferredDate,
      preferredTimeSlot,
      serviceType,
      address,
      city,
      pincode,
      estimatedAreaSqFt,
      notes,
    } = req.body;

    if (!name || !email || !phone || !preferredDate || !preferredTimeSlot || !serviceType || !address || !pincode) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all mandatory booking details.',
      });
    }

    const appointment = new Appointment({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      preferredDate: new Date(preferredDate),
      preferredTimeSlot,
      serviceType,
      address: address.trim(),
      city: city ? city.trim() : 'Main City',
      pincode: pincode.trim(),
      estimatedAreaSqFt: estimatedAreaSqFt ? Number(estimatedAreaSqFt) : undefined,
      notes: notes ? notes.trim() : '',
    });

    const saved = await appointment.save();

    res.status(201).json({
      success: true,
      message: `Your Virtual Painter / Color Consultation booking is confirmed with Reference ID: ${saved._id.toString().slice(-6).toUpperCase()}`,
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find().sort({ preferredDate: 1, createdAt: -1 });
    res.json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    next(error);
  }
};
