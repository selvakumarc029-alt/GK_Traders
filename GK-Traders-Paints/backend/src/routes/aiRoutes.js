const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  getAIColourRecommendation,
  visualizeRoomColour,
} = require('../controllers/aiController');

router.post('/recommend', getAIColourRecommendation);
router.post('/visualize', upload.single('roomImage'), visualizeRoomColour);

module.exports = router;
