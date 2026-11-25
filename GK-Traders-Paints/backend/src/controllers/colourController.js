const Colour = require('../models/Colour');

exports.getAllColours = async (req, res, next) => {
  try {
    const { category, search, popular } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (popular === 'true') {
      query.isPopular = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } },
        { hex: { $regex: search, $options: 'i' } },
        { family: { $regex: search, $options: 'i' } },
        { brandInspiration: { $regex: search, $options: 'i' } },
      ];
    }

    const colours = await Colour.find(query).sort({ isPopular: -1, name: 1 });
    res.json({ success: true, count: colours.length, data: colours });
  } catch (error) {
    next(error);
  }
};

exports.getColourByCode = async (req, res, next) => {
  try {
    const colour = await Colour.findOne({ code: req.params.code.toUpperCase() });
    if (!colour) {
      return res.status(404).json({ success: false, message: 'Colour shade not found' });
    }
    res.json({ success: true, data: colour });
  } catch (error) {
    next(error);
  }
};
