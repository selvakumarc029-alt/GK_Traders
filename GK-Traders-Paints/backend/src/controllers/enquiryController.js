const Enquiry = require('../models/Enquiry');

exports.createEnquiry = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (Name, Email, Phone, Subject, Message) are required',
      });
    }

    const newEnquiry = new Enquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });

    const savedEnquiry = await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received by G.K Traders Paints. Our paint advisor will contact you within 24 hours.',
      data: savedEnquiry,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    next(error);
  }
};
