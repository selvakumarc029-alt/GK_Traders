const Offer = require('../models/Offer');

exports.getAllOffers = async (req, res, next) => {
  try {
    const { includeExpired } = req.query;
    let query = { isActive: true };

    if (includeExpired !== 'true') {
      query.validTill = { $gte: new Date() };
    }

    const offers = await Offer.find(query).sort({ validTill: 1 });
    res.json({ success: true, count: offers.length, data: offers });
  } catch (error) {
    next(error);
  }
};

exports.getOfferById = async (req, res, next) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      return res.status(404).json({ success: false, message: 'Offer not found' });
    }
    res.json({ success: true, data: offer });
  } catch (error) {
    next(error);
  }
};
