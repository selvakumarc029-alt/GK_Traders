const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const brandRoutes = require('./routes/brandRoutes');
const offerRoutes = require('./routes/offerRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const blogRoutes = require('./routes/blogRoutes');
const colourRoutes = require('./routes/colourRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Global Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Serve uploaded media
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Root / Welcome endpoint
app.get(['/', '/api'], (req, res) => {
  res.json({
    success: true,
    message: 'G.K Traders Paints API is running',
    frontend: 'http://localhost:3000',
    endpoints: {
      health: '/api/health',
      storeInfo: '/api/store-info',
      products: '/api/products',
      categories: '/api/categories',
      brands: '/api/brands',
      colours: '/api/colours',
      offers: '/api/offers',
      blogs: '/api/blogs',
      enquiries: '/api/enquiries',
      appointments: '/api/appointments',
      ai: '/api/ai',
    },
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    business: 'G.K Traders Paints',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Store Information & Catalogue Config Endpoint
app.get('/api/store-info', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'G.K Traders Paints',
      slogan: 'YOUR TRUST. OUR PRIDE.',
      tagline: 'Colouring your world with trust',
      phone: '+91 70104 99526',
      altPhone: '+91 91235 01787',
      allPhones: ['7010499526', '9123501787'],
      whatsapp: '917010499526',
      email: 'info@gktraderspaints.com',
      address: '15/5C Rajiv Gandhi Nagar, Sivakasi Main Road, Opp to Cotton Research Centre, Srivilliputhur – 626125',
      landmark: 'Opp to Cotton Research Centre',
      city: 'Srivilliputhur',
      pincode: '626125',
      timings: 'Monday - Saturday: 8:30 AM – 9:00 PM | Sunday: 9:00 AM – 2:00 PM',
      authorizedBrands: ['Asian Paints', 'Berger Paints', 'Nerolac', 'Indigo Paints', 'Birla White', 'Dr. Fixit'],
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cotton+Research+Centre+Sivakasi+Main+Road+Srivilliputhur+626125',
    },
  });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/colours', colourRoutes);
app.use('/api/ai', aiRoutes);

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found on this server`,
  });
});

// Centralized error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🎨 G.K TRADERS PAINTS - REST API SERVER RUNNING`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

// Process signal handling
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

module.exports = app;
