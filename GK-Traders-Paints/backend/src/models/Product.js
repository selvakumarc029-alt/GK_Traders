const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand name is required'],
      index: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      default: 'Litre',
    },
    packSizes: [
      {
        size: String,
        price: Number,
      },
    ],
    coverageSqFtPerLitre: {
      type: Number,
      default: 130,
    },
    finishes: [String],
    features: [String],
    image: {
      type: String,
      required: true,
    },
    additionalImages: [String],
    inStock: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 4.8,
    },
    numReviews: {
      type: Number,
      default: 24,
    },
    warrantyYears: {
      type: Number,
      default: 5,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
