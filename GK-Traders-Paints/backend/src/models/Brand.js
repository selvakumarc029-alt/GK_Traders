const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    tagLine: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    bannerImage: {
      type: String,
    },
    establishedYear: {
      type: Number,
    },
    authorizedDealer: {
      type: Boolean,
      default: true,
    },
    featuredCategories: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Brand', brandSchema);
