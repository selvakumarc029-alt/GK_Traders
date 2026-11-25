const Category = require('../models/Category');
const Product = require('../models/Product');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    
    // Also include live product count
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({
          category: { $regex: new RegExp(`^${cat.name}$`, 'i') },
        });
        const catObj = cat.toObject();
        catObj.productCount = count;
        return catObj;
      })
    );

    res.json({ success: true, count: categoriesWithCount.length, data: categoriesWithCount });
  } catch (error) {
    next(error);
  }
};

exports.getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const products = await Product.find({
      category: { $regex: new RegExp(`^${category.name}$`, 'i') },
    });

    res.json({
      success: true,
      data: {
        category,
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};
