const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    discount: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'All Products',
    },
    image: {
      type: String,
      required: true,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validTill: {
      type: Date,
      required: true,
    },
    terms: [String],
    badge: {
      type: String,
      default: 'Limited Time',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Offer', offerSchema);
