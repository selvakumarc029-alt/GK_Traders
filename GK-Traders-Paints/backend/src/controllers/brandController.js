const Brand = require('../models/Brand');
const Product = require('../models/Product');

exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find().sort({ name: 1 });
    
    // Add dynamic product count for each brand
    const brandsWithProducts = await Promise.all(
      brands.map(async (brand) => {
        const count = await Product.countDocuments({
          brand: { $regex: new RegExp(`^${brand.name}$`, 'i') },
        });
        const brandObj = brand.toObject();
        brandObj.productCount = count;
        return brandObj;
      })
    );

    res.json({ success: true, count: brandsWithProducts.length, data: brandsWithProducts });
  } catch (error) {
    next(error);
  }
};

exports.getBrandBySlug = async (req, res, next) => {
  try {
    const brand = await Brand.findOne({ slug: req.params.slug });
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    const products = await Product.find({
      brand: { $regex: new RegExp(`^${brand.name}$`, 'i') },
    });

    res.json({
      success: true,
      data: {
        brand,
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};
