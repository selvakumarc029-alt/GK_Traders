const Product = require('../models/Product');

// Get all products with filters, search, and sorting
exports.getAllProducts = async (req, res, next) => {
  try {
    const { category, brand, search, sort, minPrice, maxPrice, finish } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (brand && brand !== 'All') {
      query.brand = { $regex: new RegExp(`^${brand}$`, 'i') };
    }

    if (finish && finish !== 'All') {
      query.finishes = { $in: [finish] };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let productsQuery = Product.find(query);

    if (sort === 'price_asc') {
      productsQuery = productsQuery.sort({ price: 1 });
    } else if (sort === 'price_desc') {
      productsQuery = productsQuery.sort({ price: -1 });
    } else if (sort === 'rating') {
      productsQuery = productsQuery.sort({ rating: -1 });
    } else {
      productsQuery = productsQuery.sort({ isFeatured: -1, createdAt: -1 });
    }

    const products = await productsQuery;
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// Get single product by ID or Slug
exports.getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({
      $or: [{ slug }, { _id: slug.match(/^[0-9a-fA-F]{24}$/) ? slug : null }],
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Get related products in same category or brand
    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      $or: [{ category: product.category }, { brand: product.brand }],
    }).limit(4);

    res.json({
      success: true,
      data: product,
      relatedProducts,
    });
  } catch (error) {
    next(error);
  }
};

// Create product (Admin / Catalog)
exports.createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    if (!product.slug && product.name) {
      product.slug = product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    const saved = await product.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    next(error);
  }
};
