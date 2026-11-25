const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    preferredDate: {
      type: Date,
      required: [true, 'Preferred date is required'],
    },
    preferredTimeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
      enum: ['Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 3 PM)', 'Evening (3 PM - 7 PM)'],
    },
    serviceType: {
      type: String,
      required: true,
      enum: [
        'Complete Home Painting',
        'Interior Repaint',
        'Exterior Weatherproofing',
        'Waterproofing Consultation',
        'Wood & Metal Polishing',
        'Colour Consultation & Measurement',
      ],
    },
    address: {
      type: String,
      required: [true, 'Service address is required'],
      trim: true,
    },
    city: {
      type: String,
      default: 'Main City',
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
    },
    estimatedAreaSqFt: {
      type: Number,
      min: 0,
    },
    notes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Site Visited', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
