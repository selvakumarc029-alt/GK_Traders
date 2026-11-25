const mongoose = require('mongoose');

const colourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    hex: {
      type: String,
      required: true,
      match: [/^#([A-Fa-f0-9]{6})$/, 'Please provide a valid 6-character hex code'],
    },
    category: {
      type: String,
      required: true,
      enum: ['Warm', 'Cool', 'Neutrals', 'Pastels', 'Vibrant', 'Monochrome'],
    },
    family: {
      type: String,
      default: 'General',
    },
    mood: {
      type: String,
      default: 'Balanced & Calming',
    },
    roomSuitability: [String],
    complementaryHex: [String],
    description: {
      type: String,
      required: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    brandInspiration: {
      type: String,
      default: 'Asian Paints',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Colour', colourSchema);
